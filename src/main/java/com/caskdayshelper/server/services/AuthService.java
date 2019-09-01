package com.caskdayshelper.server.services;

import com.caskdayshelper.server.config.Credentials;
import com.caskdayshelper.server.services.model.FacebookTokenResponse;
import com.caskdayshelper.server.services.model.GithubTokenResponse;
import com.caskdayshelper.server.services.model.GoogleTokenResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.lettuce.core.api.async.RedisAsyncCommands;
import org.apache.tomcat.util.scan.JarFileUrlNestedJar;
import org.asynchttpclient.AsyncHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.security.Key;
import java.sql.Date;
import java.time.Instant;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

import static org.asynchttpclient.Dsl.asyncHttpClient;

/**
 * Authentication service for OAuth2.
 */
@Path("/")
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private static final String GITHUB_REDIRECT_PATH = "auth/githubcallback";
    private static final String GOOGLE_REDIRECT_PATH = "auth/googlecallback";
    private static final String FACEBOOK_REDIRECT_PATH = "auth/fbcallback";

    private static final String GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    private static final String GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
    private static final String GITHUB_API_URL = "https://api.github.com/";
    private static final String GITHUB_ID_PREPEND = "github-";

    private static final String GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
    private static final String GOOGLE_API_URL = "https://www.googleapis.com/oauth2/v2/";
    private static final String GOOGLE_ID_PREPEND = "google-";

    private static final String FACEBOOK_AUTH_URL = "https://www.facebook.com/v4.0/dialog/oauth";
    private static final String FACEBOOK_TOKEN_URL = "https://graph.facebook.com/v4.0/oauth/access_token";
    private static final String FACEBOOK_API_URL = "https://graph.facebook.com/";
    private static final String FACEBOOK_ID_PREPEND = "fb-";

    private static final String REDIS_STATE_SET_NAME = "stateset";

    private final Key jwtKey;
    private final Credentials credentials;
    private final RedisAsyncCommands<String, String> asyncRedis;
    private final Executor asyncExecutor;
    private final AsyncHttpClient httpClient;
    private final ObjectMapper mapper;
    private final String baseUrl;

    public AuthService(Key jwtKey, Credentials credentials, RedisAsyncCommands<String, String> asyncRedis, Executor asyncExecutor, ObjectMapper mapper, String baseUrl) {
        this.jwtKey = jwtKey;
        this.credentials = credentials;
        this.asyncRedis = asyncRedis;
        this.asyncExecutor = asyncExecutor;
        httpClient = asyncHttpClient();
        this.mapper = mapper;
        this.baseUrl = baseUrl;
    }

    private String createJws(String userId) {
        return Jwts.builder().setSubject(userId).signWith(jwtKey).compact();
    }

    private String createJws(String userId, Instant expiry) {
        return Jwts.builder().setSubject(userId).setExpiration(Date.from(expiry)).signWith(jwtKey).compact();
    }

    private static String generateTokenState() {
        return UUID.randomUUID().toString();
    }

    private String createRedirectUrl(String redirectPath) {
        String redirectUrl = baseUrl;
        if (!baseUrl.endsWith("/") && !redirectPath.startsWith("/")) {
            redirectUrl += "/";
        }
        redirectUrl += redirectPath;
        return redirectUrl;
    }

    private CompletableFuture<org.asynchttpclient.Response> postApiRequest(String baseUrl, Map<String, String> queryParams, Map<String, String> headers) {
        var builder = UriBuilder.fromPath(baseUrl);
        queryParams.forEach(builder::queryParam);
        var apiUri = builder.build().toASCIIString();
        var preparedPost = httpClient.preparePost(apiUri);
        headers.forEach(preparedPost::addHeader);
        return preparedPost.execute().toCompletableFuture();
    }

    private CompletableFuture<org.asynchttpclient.Response> getApiRequest(String baseUrl, Map<String, String> queryParams, Map<String, String> headers) {
        var builder = UriBuilder.fromPath(baseUrl);
        queryParams.forEach(builder::queryParam);
        var apiUri = builder.build().toASCIIString();
        var preparedGet = httpClient.prepareGet(apiUri);
        headers.forEach(preparedGet::addHeader);
        return preparedGet.execute().toCompletableFuture();
    }

    private void createRedirect(final AsyncResponse response, UriBuilder redirectUriBuilder, Credentials.Providers credentialProvider, String redirectPath) {
        var maybeCredentials = credentials.findCredentials(credentialProvider);
        if (maybeCredentials.isEmpty()) {
            logger.error("Could not auth with {}, no credentials found.", credentialProvider);
            response.resume(Response.status(Response.Status.NOT_IMPLEMENTED).build());
            return;
        }
        var credentials = maybeCredentials.get();
        var tokenState = generateTokenState();
        asyncRedis.sadd(REDIS_STATE_SET_NAME, tokenState).thenAcceptAsync(res -> {
            var redirectUrl = createRedirectUrl(redirectPath);
            URI redirectUri = redirectUriBuilder
                    .queryParam("client_id", credentials.getId())
                    .queryParam("redirect_uri", redirectUrl)
                    .queryParam("state", tokenState)
                    .build();
            logger.info("Redirecting to: \"{}\"", redirectUri.toASCIIString());
            response.resume(Response.temporaryRedirect(redirectUri).build());
        }, asyncExecutor);
    }

    @GET
    @Path("/github")
    public void authGithub(@Suspended final AsyncResponse response) {
        UriBuilder redirectUriBuilder = UriBuilder.fromPath(GITHUB_AUTH_URL)
                .queryParam("response_type", "code")
                .queryParam("scope", "user");
        createRedirect(response, redirectUriBuilder, Credentials.Providers.GITHUB, GITHUB_REDIRECT_PATH);
    }

    @GET
    @Path("/google")
    public void authGoogle(@Suspended final AsyncResponse response) {
        UriBuilder redirectUriBuilder = UriBuilder.fromPath(GOOGLE_AUTH_URL)
                .queryParam("response_type", "code")
                .queryParam("scope", "profile")
                .queryParam("access_type", "online");
        createRedirect(response, redirectUriBuilder, Credentials.Providers.GOOGLE, GOOGLE_REDIRECT_PATH);
    }

    @GET
    @Path("/fb")
    public void authFacebook(@Suspended final AsyncResponse response) {
        UriBuilder redirectUriBuilder = UriBuilder.fromPath(FACEBOOK_AUTH_URL)
                .queryParam("response_type", "code");
        createRedirect(response, redirectUriBuilder, Credentials.Providers.FACEBOOK, FACEBOOK_REDIRECT_PATH);
    }

    @GET
    @Path("/githubcallback")
    public void githubAuthCallback(@Suspended final AsyncResponse response, @QueryParam("code") String code, @QueryParam("state") String state) {
        logger.trace("Github auth callback");
        asyncRedis.srem(REDIS_STATE_SET_NAME, state).thenAcceptAsync(res -> {
            // invalid state
            if (res != 1) {
                logger.error("Invalid token state in callback: {}, removed {}", state, res);
                response.resume(Response.status(Response.Status.BAD_REQUEST).build());
                return;
            }
            logger.trace("Valid state");

            var maybeCredentials = credentials.findCredentials(Credentials.Providers.GITHUB);
            if (maybeCredentials.isEmpty()) {
                logger.error("Could not auth with github, no credentials found.");
                response.resume(Response.status(Response.Status.NOT_IMPLEMENTED).build());
                return;
            }
            var githubCreds = maybeCredentials.get();
            logger.trace("Got the github creds");

            // valid state, exchange code for token
            var redirectUrl = createRedirectUrl(GITHUB_REDIRECT_PATH);
            postApiRequest(GITHUB_TOKEN_URL, Map.of(
                    "grant_type", "authorization_code",
                    "client_id", githubCreds.getId(),
                    "client_secret", githubCreds.getSecret(),
                    "redirect_uri", redirectUrl,
                    "code", code
            ), Map.of(
                    "Accept", "application/json"
            )).handleAsync((apiResponse, throwable) -> {
                logger.trace("Got token response");
                if (throwable != null) {
                    logger.error("Got an error trying to get a token from github.", throwable);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }

                GithubTokenResponse tokenResponse;
                try {
                    tokenResponse = mapper.readValue(apiResponse.getResponseBodyAsStream(), GithubTokenResponse.class);
                } catch (Exception e) {
                    logger.error("Couldn't read token response from github.", e);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }
                logger.trace("Got token response: {}, asking for user data", tokenResponse.toString());

                // yet another level deep we go, we need the user id
                getApiRequest(GITHUB_API_URL + "user", Collections.emptyMap(), Map.of(
                        "Accept", "application/vnd.github.v3+json",
                        "Authorization", "token " + tokenResponse.getAccessToken()
                )).handleAsync((userApiResponse, throwable2) -> {
                    logger.trace("back from github api");
                    if (throwable2 != null) {
                        logger.error("Got an error trying to get user data from github.", throwable2);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("No error");

                    String userName;
                    try {
                        var rootNode = mapper.readTree(userApiResponse.getResponseBodyAsStream());
                        userName = rootNode.get("login").asText();
                    } catch (Exception e) {
                        logger.error("Couldn't read user response from github.", e);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("Got username: {}", userName);

                    String jws = createJws(GITHUB_ID_PREPEND + userName);
                    logger.trace("created jws: {}", jws);
                    URI uri = UriBuilder.fromPath(createRedirectUrl("/auth/isauthed/") + jws).build();
                    logger.trace("redirect uri: {}", uri.toASCIIString());
                    response.resume(Response.temporaryRedirect(uri).build());

                    return true;
                }, asyncExecutor);
                return true;
            }, asyncExecutor);
        }, asyncExecutor);
    }

    @GET
    @Path("/googlecallback")
    public void googleAuthCallback(@Suspended final AsyncResponse response, @QueryParam("code") String code, @QueryParam("state") String state) {
        logger.trace("Google auth callback");
        asyncRedis.srem(REDIS_STATE_SET_NAME, state).thenAcceptAsync(res -> {
            // invalid state
            if (res != 1) {
                logger.error("Invalid token state in callback: {}, removed {}", state, res);
                response.resume(Response.status(Response.Status.BAD_REQUEST).build());
                return;
            }
            logger.trace("Valid state");

            var maybeCredentials = credentials.findCredentials(Credentials.Providers.GOOGLE);
            if (maybeCredentials.isEmpty()) {
                logger.error("Could not auth with google, no credentials found.");
                response.resume(Response.status(Response.Status.NOT_IMPLEMENTED).build());
                return;
            }
            var googleCreds = maybeCredentials.get();
            logger.trace("Got the google creds");

            // valid state, exchange code for token
            var redirectUrl = createRedirectUrl(GOOGLE_REDIRECT_PATH);
            postApiRequest(GOOGLE_TOKEN_URL, Map.of(
                    "grant_type", "authorization_code",
                    "client_id", googleCreds.getId(),
                    "client_secret", googleCreds.getSecret(),
                    "redirect_uri", redirectUrl,
                    "code", code
            ), Map.of(
                    "Accept", "application/json"
            )).handleAsync((apiResponse, throwable) -> {
                logger.trace("Got token response");
                if (throwable != null) {
                    logger.error("Got an error trying to get a token from google.", throwable);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }

                GoogleTokenResponse tokenResponse;
                try {
                    tokenResponse = mapper.readValue(apiResponse.getResponseBodyAsStream(), GoogleTokenResponse.class);
                } catch (Exception e) {
                    logger.error("Couldn't read token response from google.", e);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }
                logger.trace("Got token response: {}, asking for user data", tokenResponse.toString());

                // yet another level deep we go, we need the user id
                getApiRequest(GOOGLE_API_URL + "userinfo", Collections.emptyMap(), Map.of(
                        "Authorization", "Bearer " + tokenResponse.getAccessToken()
                )).handleAsync((userApiResponse, throwable2) -> {
                    logger.trace("back from google api");
                    if (throwable2 != null) {
                        logger.error("Got an error trying to get user data from google.", throwable2);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("No error");

                    String userId;
                    try {
                        var rootNode = mapper.readTree(userApiResponse.getResponseBodyAsStream());
                        userId = rootNode.get("id").asText();
                    } catch (Exception e) {
                        logger.error("Couldn't read user response from google.", e);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("Got user id: {}", userId);

                    String jws = createJws(GOOGLE_ID_PREPEND + userId, tokenResponse.getExpiresAt());
                    logger.trace("created jws: {}", jws);
                    URI uri = UriBuilder.fromPath(createRedirectUrl("/auth/isauthed/") + jws).build();
                    logger.trace("redirect uri: {}", uri.toASCIIString());
                    response.resume(Response.temporaryRedirect(uri).build());

                    return true;
                }, asyncExecutor);
                return true;
            }, asyncExecutor);
        }, asyncExecutor);
    }

    @GET
    @Path("/fbcallback")
    public void facebookAuthCallback(@Suspended final AsyncResponse response, @QueryParam("code") String code, @QueryParam("state") String state) {
        logger.trace("Facebook auth callback");
        logger.info("Got Facebook callback, code: {}, state: {}", code, state);
        asyncRedis.srem(REDIS_STATE_SET_NAME, state).thenAcceptAsync(res -> {
            // invalid state
            if (res != 1) {
                logger.error("Invalid token state in callback: {}, removed {}", state, res);
                response.resume(Response.status(Response.Status.BAD_REQUEST).build());
                return;
            }
            logger.trace("Valid state");

            var maybeCredentials = credentials.findCredentials(Credentials.Providers.FACEBOOK);
            if (maybeCredentials.isEmpty()) {
                logger.error("Could not auth with facebook, no credentials found.");
                response.resume(Response.status(Response.Status.NOT_IMPLEMENTED).build());
                return;
            }
            var fbCreds = maybeCredentials.get();
            logger.trace("Got the facebook creds");

            // valid state, exchange code for token
            var redirectUrl = createRedirectUrl(FACEBOOK_REDIRECT_PATH);
            getApiRequest(FACEBOOK_TOKEN_URL, Map.of(
                    "client_id", fbCreds.getId(),
                    "client_secret", fbCreds.getSecret(),
                    "redirect_uri", redirectUrl,
                    "code", code
            ), Collections.emptyMap()).handleAsync((apiResponse, throwable) -> {
                logger.trace("Got token response");
                if (throwable != null) {
                    logger.error("Got an error trying to get a token from facebook.", throwable);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }

                FacebookTokenResponse tokenResponse;
                try {
                    tokenResponse = mapper.readValue(apiResponse.getResponseBodyAsStream(), FacebookTokenResponse.class);
                } catch (Exception e) {
                    logger.error("Couldn't read token response from facebook.", e);
                    response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                    return false;
                }
                logger.trace("Got token response: {}, asking for user data", tokenResponse.toString());

                // yet another level deep we go, we need the user id
                getApiRequest(FACEBOOK_API_URL + "me", Map.of(
                        "fields", "id",
                        "access_token", tokenResponse.getAccessToken()
                ), Collections.emptyMap()).handleAsync((userApiResponse, throwable2) -> {
                    logger.trace("back from facebook api");
                    if (throwable2 != null) {
                        logger.error("Got an error trying to get user data from facebook.", throwable2);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("No error");

                    String userId;
                    try {
                        var rootNode = mapper.readTree(userApiResponse.getResponseBodyAsStream());
                        userId = rootNode.get("id").asText();
                    } catch (Exception e) {
                        logger.error("Couldn't read user response from facebook.", e);
                        response.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
                        return false;
                    }
                    logger.trace("Got user id: {}", userId);

                    String jws = createJws(FACEBOOK_ID_PREPEND + userId, tokenResponse.getExpiresAt());
                    logger.trace("created jws: {}", jws);
                    URI uri = UriBuilder.fromPath(createRedirectUrl("/auth/isauthed/") + jws).build();
                    logger.trace("redirect uri: {}", uri.toASCIIString());
                    response.resume(Response.temporaryRedirect(uri).build());

                    return true;
                }, asyncExecutor);
                return true;
            }, asyncExecutor);
        }, asyncExecutor);
    }

    @GET
    @Path("isauthed/{jwt}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response isAuthedTest(@PathParam("jwt") String jws) {
        try {
            var parsedJws = Jwts.parser().setSigningKey(jwtKey).parseClaimsJws(jws);
            String userId = parsedJws.getBody().getSubject();
            return Response.ok("Hello, " + userId + "!").build();
        } catch (Exception e) {
            logger.error("Got error in auth test.", e);
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }
}

package com.caskdayshelper.server;

import com.caskdayshelper.server.config.Configuration;
import com.caskdayshelper.server.config.Credentials;
import com.caskdayshelper.server.config.LoggingConfig;
import com.caskdayshelper.server.config.RESTServerBuilder;
import com.caskdayshelper.server.services.AuthService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import java.util.Properties;
import java.util.concurrent.Executors;

public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    private static final String CONFIG_PATH = "config/server.properties";
    private static final String REST_PORT_KEY = "port";
    private static final int DEFAULT_REST_PORT = 13370;
    private static final String JWT_KEY_KEY = "jwt.key";
    private static final String REDIS_HOST_KEY = "redis.host";
    private static final String DEFAULT_REDIS_HOST = "localhost";
    private static final String REDIS_PORT_KEY = "redis.port";
    private static final String REDIS_PW_KEY = "redis.pw";
    private static final int DEFAULT_REDIS_PORT = 6379;

    /**
     * Build the credentials we'll need for auth.
     *
     * @param props The server properties.
     * @return The built credentials.
     */
    private static Credentials buildCredentials(Properties props) {
        var builder = new Credentials.Builder();
        if (props.containsKey("oauth.github.id") && props.containsKey("oauth.github.secret")) {
            builder.addCredential(Credentials.Providers.GITHUB, props.getProperty("oauth.github.id"), props.getProperty("oauth.github.secret"));
        }
        return builder.build();
    }

    /**
     * Build the connection to redis.
     *
     * @param props The server properties.
     * @return The created redis connection.
     */
    private static StatefulRedisConnection<String, String> buildRedis(Properties props) {
        var redisHost = props.getProperty(REDIS_HOST_KEY, DEFAULT_REDIS_HOST);
        var redisPort = Integer.parseInt(props.getProperty(REDIS_PORT_KEY, Integer.toUnsignedString(DEFAULT_REDIS_PORT)));
        var builder = RedisURI.Builder.redis(redisHost, redisPort);
        if (props.containsKey(REDIS_PW_KEY)) {
            builder.withPassword(props.getProperty(REDIS_PW_KEY));
        }
        RedisClient client = RedisClient.create(builder.build());
        return client.connect();
    }

    /**
     * Starting point for the program.
     *
     * @param args The arguments for the program.
     */
    public static void main(String[] args) {
        LoggingConfig.configureLog4j();

        Properties props = Configuration.loadConfiguration(CONFIG_PATH, CONFIG_PATH);

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .enable(SerializationFeature.INDENT_OUTPUT);

        String keyBase64 = props.getProperty(JWT_KEY_KEY);
        byte[] keyBytes = Base64.decodeBase64(keyBase64);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        var asyncExecutor = Executors.newSingleThreadExecutor();

        var credentials = buildCredentials(props);
        var redisConnection = buildRedis(props);

        int port = Integer.parseInt(props.getProperty(REST_PORT_KEY, Integer.toUnsignedString(DEFAULT_REST_PORT)));
        var server = new RESTServerBuilder(port)
                .addSLF4JRequestLogging()
                .addResource("/auth", res ->
                        res.addCORS()
                                .addJackson(mapper)
                                .generateWADL(true)
                                .addService(new AuthService(key, credentials, redisConnection.async(), asyncExecutor, mapper)))
                .build();

        try {
            server.start();
            server.join();
        } catch (Exception e) {
            logger.error("Cask Days server has died.", e);
        }

        logger.info("Shutting down Cask Days server.");
    }
}

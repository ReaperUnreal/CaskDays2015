package com.caskdayshelper.server.services.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.Instant;

public class FacebookTokenResponse {
    private final String accessToken;
    private final Instant expiresAt;
    private final String tokenType;

    @JsonCreator
    public FacebookTokenResponse(@JsonProperty("access_token") String accessToken, @JsonProperty("expires_in") int expiresSeconds, @JsonProperty("token_type") String tokenType) {
        this.accessToken = accessToken;
        this.expiresAt = Instant.now().plusSeconds(expiresSeconds);
        this.tokenType = tokenType;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public String getTokenType() {
        return tokenType;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("accessToken", accessToken)
                .append("expiresAt", expiresAt)
                .append("tokenType", tokenType)
                .toString();
    }
}

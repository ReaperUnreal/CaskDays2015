package com.caskdayshelper.server.services.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class GithubTokenResponse {
    private final String accessToken;
    private final String scope;
    private final String tokenType;

    @JsonCreator
    public GithubTokenResponse(@JsonProperty("access_token") String accessToken, @JsonProperty("scope") String scope, @JsonProperty("token_type") String tokenType) {
        this.accessToken = accessToken;
        this.scope = scope;
        this.tokenType = tokenType;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getScope() {
        return scope;
    }

    public String getTokenType() {
        return tokenType;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("accessToken", accessToken)
                .append("scope", scope)
                .append("tokenType", tokenType)
                .toString();
    }
}

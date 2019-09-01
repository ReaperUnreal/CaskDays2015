package com.caskdayshelper.server.config;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Class for keeping track of the credentials we have.
 */
public class Credentials {
    /**
     * The possible credential providers.
     */
    public enum Providers {
        GITHUB,
        FACEBOOK,
        GOOGLE;
    }

    /**
     * Class for keeping track of an id and a secret.
     */
    public static class IdSecretPair {
        /**
         * The ID.
         */
        private final String id;

        /**
         * The secret.
         */
        private final String secret;

        /**
         * Create an ID and secret pair.
         *
         * @param id The ID.
         * @param secret The secret.
         */
        public IdSecretPair(String id, String secret) {
            this.id = id;
            this.secret = secret;
        }

        /**
         * Get the ID.
         *
         * @return The ID.
         */
        public String getId() {
            return id;
        }

        /**
         * Get the secret.
         *
         * @return The secret.
         */
        public String getSecret() {
            return secret;
        }
    }

    /**
     * The map of credentials by provider.
     */
    private final Map<Providers, IdSecretPair> credentialsMap;

    /**
     * Create the credentials provider with a list of total credentials.
     *
     * @param credentials The list of credentials.
     */
    private Credentials(Map<Providers, IdSecretPair> credentials) {
        credentialsMap = new ConcurrentHashMap<>(credentials);
    }

    /**
     * See if we've got the credentials for a provider.
     *
     * @param provider The credentials of the provider.
     * @return The optional credentials.
     */
    public Optional<IdSecretPair> findCredentials(Providers provider) {
        return Optional.ofNullable(credentialsMap.get(provider));
    }

    /**
     * Builder to make a Credentials class.
     */
    public static class Builder {
        /**
         * Inner map of credentials.
         */
        private final Map<Providers, IdSecretPair> credentialsMap;

        /**
         * Create a builder for credentials.
         */
        public Builder() {
            credentialsMap = new ConcurrentHashMap<>();
        }

        /**
         * Add some credentials to the list.
         *
         * @param provider The provider to add credentials for.
         * @param id The ID for the provider.
         * @param secret The secret for the provider.
         * @return The builder.
         */
        public Builder addCredential(Providers provider, String id, String secret) {
            credentialsMap.put(provider, new IdSecretPair(id, secret));
            return this;
        }

        /**
         * Build a Credentials object from the credentials submitted so far.
         *
         * @return The created Credentials object.
         */
        public Credentials build() {
            return new Credentials(credentialsMap);
        }
    }

}

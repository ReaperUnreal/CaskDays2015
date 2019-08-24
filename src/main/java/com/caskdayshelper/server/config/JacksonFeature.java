package com.caskdayshelper.server.config;

import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

/**
 * Simple feature that enables a custom object mapper to be set when handling JSON input and output
 */
public class JacksonFeature implements Feature {

    /**
     * Object mapper used to serialize / deserialize
     */
    private final ObjectMapper mapper;

    /**
     * Create the feature
     *
     * @param mapper mapper to use
     */
    JacksonFeature(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * Configure the context
     *
     * @param context server feature context
     * @return success status
     */
    @Override
    public boolean configure(FeatureContext context) {
        JacksonJaxbJsonProvider provider = new JacksonJaxbJsonProvider();
        provider.setMapper(mapper);

        context.register(provider);
        return true;
    }
}

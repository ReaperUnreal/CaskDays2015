package com.caskdayshelper.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.servlet.DispatcherType;
import java.util.EnumSet;
import java.util.HashMap;

/**
 * This is a class that wraps resource config and servlet context configuration
 */
public class RESTContextConfigurer {

    /**
     * Context that holds the resource config
     */
    private final ServletContextHandler context;

    /**
     * The internal resource config
     */
    private final ResourceConfig serverResources;

    /**
     * Create a new context configurer
     *
     * @param context context holder
     * @param serverResources resource config
     */
    RESTContextConfigurer(ServletContextHandler context, ResourceConfig serverResources) {
        this.context = context;
        this.serverResources = serverResources;
    }

    /**
     * Add CORS to requests made against this context
     *
     * @return context configurer
     */
    public RESTContextConfigurer addCORS() {
        FilterHolder corsFilterHolder = context.addFilter(CrossOriginFilter.class, "/*", EnumSet.allOf(DispatcherType.class));

        HashMap<String, String> corsParams = new HashMap<>();
        corsParams.put("allowedMethods", "GET,POST,HEAD,PUT,DELETE");
        corsFilterHolder.setInitParameters(corsParams);

        return this;
    }

    /**
     * Add a default object mapper
     *
     * @return context configurer
     */
    public RESTContextConfigurer addJackson() {
        return addJackson(new ObjectMapper());
    }

    /**
     * Add a specific object mapper
     *
     * @param mapper mapper to configure the server to use
     * @return context configurer
     */
    public RESTContextConfigurer addJackson(ObjectMapper mapper) {
        serverResources.register(new JacksonFeature(mapper));
        return this;
    }

    /**
     * Enable multi part form uploads
     *
     * @return context configurer
     */
    public RESTContextConfigurer addMultipart() {
        serverResources.register(MultiPartFeature.class);
        return this;
    }

    /**
     * Add a service to the context
     *
     * @param service REST service to enable
     * @return context configurer
     */
    public RESTContextConfigurer addService(Object service) {
        serverResources.register(service);
        return this;
    }

    /**
     * enables or disables WADL generation
     * defaults to on
     *
     * @param enableWADL Whether or not to enable the WADL.
     * @return context configurer
     */
    public RESTContextConfigurer generateWADL(boolean enableWADL) {
        serverResources.property("jersey.config.server.wadl.disableWadl", !enableWADL);
        return this;
    }
}

package com.caskdayshelper.server.config;

import org.eclipse.jetty.jmx.MBeanContainer;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.Slf4jRequestLog;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * This is a wrapper around the various jetty features to allow simplified configuration and construction
 * of a jetty server.
 */
public class RESTServerBuilder {
    /**
     * The server that we're configuring
     */
    private final Server server;

    /**
     * List of handlers that eventually get registered on the server
     */
    private final List<Handler> handlers;

    /**
     * Create a server builder that will eventually listen on the given port
     *
     * @param port port to bind to
     */
    public RESTServerBuilder(int port) {
        server = new Server(port);
        handlers = new ArrayList<>();

        handlers.add(new DefaultHandler());
    }

    /**
     * Configure jmx
     *
     * @return server builder
     */
    public RESTServerBuilder addJMX() {
        MBeanContainer mbContainer = new MBeanContainer(
                ManagementFactory.getPlatformMBeanServer()
        );
        server.addBean(mbContainer);
        return this;
    }

    /**
     * Add a general resource to the server under the given url prefix
     *
     * @param prefix prefix to register the resource under
     * @param consumer a function to configure the resource context
     * @return the server builder
     */
    public RESTServerBuilder addResource(String prefix, Consumer<RESTContextConfigurer> consumer) {
        ResourceConfig serverResources = new ResourceConfig();
        ServletContainer container = new ServletContainer(serverResources);
        ServletHolder holder = new ServletHolder(container);

        ServletContextHandler restContext = new ServletContextHandler(server, prefix, ServletContextHandler.SESSIONS);
        restContext.addServlet(holder, "/*");

        handlers.add(0, restContext);

        consumer.accept(new RESTContextConfigurer(restContext, serverResources));
        return this;
    }

    /**
     * Configure SLF4J logging for requests
     *
     * @return the server builder
     */
    public RESTServerBuilder addSLF4JRequestLogging() {
        Slf4jRequestLog requestLog = new Slf4jRequestLog();
        server.setRequestLog(requestLog);
        return this;
    }

    /**
     * Finalize the builder and get back a configured server
     *
     * @return configured server
     */
    public Server build() {
        HandlerList handlerList = new HandlerList();
        handlerList.setHandlers(handlers.toArray(new Handler[0]));

        server.setHandler(handlerList);

        return server;
    }
}

package com.guillaumecl.caskdays;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.servlet.ServletContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.DispatcherType;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Properties;

/**
 * Entry point for the rest server
 */
public class Main {
	/**
	 * Logger instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(Main.class);
	
	/**
	 * Path to file config.
	 */
	public static final String CONFIG_FILE_PATH = "config/server.properties";

	/**
	 * Start up the rest server
	 *
	 *   - args[0] can be a port specifier
	 *
	 * @param args arguments
	 */
	public static void main(String[] args) {

		Config config = loadConfiguration();

		CaskDaysServerResources slotsTools = new CaskDaysServerResources();

		ServletContainer container = new ServletContainer(slotsTools);
		ServletHolder holder = new ServletHolder(container);

		Server server = new Server(config.getPort());

		ServletContextHandler restContext = new ServletContextHandler(server, "/", ServletContextHandler.SESSIONS);
		restContext.addServlet(holder, "/*");
		FilterHolder corsFilterHolder = restContext.addFilter(CrossOriginFilter.class, "/*", EnumSet.allOf(DispatcherType.class));

		HashMap<String, String> corsParams = new HashMap<>();
		corsParams.put("allowedMethods", "GET,POST,HEAD,PUT,DELETE");
		corsFilterHolder.setInitParameters(corsParams);

		HandlerList handlers = new HandlerList();
		handlers.setHandlers(new Handler[] { restContext });

		server.setHandler(handlers);

		try {
			server.start();
			server.join();
		} catch (Exception e) {
			logger.error("Big Ole' Server Error", e);
		}
	}

	/**
	 * Load the configuration (skipping connections)
	 *
	 * @return configuration
	 */
	private static Config loadConfiguration() {
		Properties serverProperties = new Properties();
		try {
			serverProperties.load(new FileInputStream(CONFIG_FILE_PATH));
		} catch (IOException exception) {
			logger.error("Could not open {}", CONFIG_FILE_PATH, exception);
		}

		return new Config(serverProperties);
	}
}

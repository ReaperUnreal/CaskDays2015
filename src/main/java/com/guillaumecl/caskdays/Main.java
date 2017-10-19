package com.guillaumecl.caskdays;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.guillaumecl.caskdays.external.BeerListParser;
import com.guillaumecl.caskdays.spellcheck.SpellChecker;
import com.mashape.unirest.http.Unirest;
import java.io.File;
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
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.PropertyConfigurator;
import redis.clients.jedis.Jedis;

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
	 * - args[0] can be a port specifier
	 *
	 * @param args arguments
	 */
	public static void main(String[] args) {

		Config config = loadConfiguration();

		configureLog4j();
		configureJackson(config);
		configureJedis(config);

		CaskDaysServerResources caskDaysServer = new CaskDaysServerResources(config);

		ServletContainer container = new ServletContainer(caskDaysServer);
		ServletHolder holder = new ServletHolder(container);

		Server server = new Server(config.getPort());

		ServletContextHandler restContext = new ServletContextHandler(server, "/", ServletContextHandler.SESSIONS);
		restContext.addServlet(holder, "/*");
		FilterHolder corsFilterHolder = restContext.addFilter(CrossOriginFilter.class, "/*", EnumSet.allOf(DispatcherType.class));

		HashMap<String, String> corsParams = new HashMap<>();
		corsParams.put("allowedMethods", "GET,POST,OPTIONS");
		corsFilterHolder.setInitParameters(corsParams);

		HandlerList handlers = new HandlerList();
		handlers.setHandlers(new Handler[]{restContext});

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

	/**
	 * Configure jackson.
	 *
	 * @param config
	 */
	private static void configureJackson(Config config) {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper
				.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
				// ignore additional/unknown properties
				.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
				// don't serialize nulls
				.setSerializationInclusion(JsonInclude.Include.NON_NULL)
				// set the date output format
				.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"));

		config.setJsonMapper(objectMapper);
	}

	/**
	 * Configure Jedis with the appropriate stuff and save it to config.
	 *
	 * @param config
	 */
	private static void configureJedis(Config config) {
		Jedis jedis = new Jedis("localhost");
		config.setJedis(jedis);
	}

	private static void configureLog4j() {
		// Configure from built in config
		ClassLoader loader = Main.class.getClassLoader();
		URL configUrl = loader.getResource("log4j.properties");
		if (configUrl != null) {
			PropertyConfigurator.configure(configUrl);
		}

		// Then check for config file
		File log4jFile = new File("config/log4j.properties");
		PropertyConfigurator.configureAndWatch(log4jFile.getAbsolutePath());
	}
}

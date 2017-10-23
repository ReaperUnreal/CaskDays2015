package com.bigvikinggames.animoji;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

/**
 * Config for the server.
 *
 * @author gcl
 */
public class Config {

	/**
	 * Default port to listen on
	 */
	private static final int DEFAULT_PORT = 7613;

	/**
	 * Port to listen on.
	 */
	private final int port;
	
	private final Path userImagePath;


	/**
	 * Default constructor.
	 *
	 * @param serverProperties server properties collection
	 */
	public Config(Properties serverProperties) {
		port = Integer.parseInt(serverProperties.getProperty("port", Integer.toString(DEFAULT_PORT)));
		userImagePath = Paths.get(serverProperties.getProperty("userImagePath"));
	}

	/**
	 * Port to listen on.
	 *
	 * @return the port
	 */
	public int getPort() {
		return port;
	}
	
	public Path getUserImagePath() {
		return userImagePath;
	}
}

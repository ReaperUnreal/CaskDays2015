package com.guillaumecl.caskdays;

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
	
	/**
	 * Default constructor.
	 * 
	 * @param serverProperties
	 */
	public Config(Properties serverProperties) {
		port = Integer.parseInt(serverProperties.getProperty("port", Integer.toString(DEFAULT_PORT)));
	}

	/**
	 * Port to listen on.
	 * 
	 * @return the port
	 */
	public int getPort() {
		return port;
	}
}

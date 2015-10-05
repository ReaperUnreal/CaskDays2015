package com.guillaumecl.caskdays;

import com.fasterxml.jackson.databind.ObjectMapper;
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
	 * Default cask days website to load.
	 */
	private static final String DEFAULT_CASK_DAYS_LIST_URL = "http://festival.caskdays.com/oncask";

	/**
	 * Port to listen on.
	 */
	private final int port;
	
	/**
	 * The web site to load.
	 */
	private final String caskDaysListUrl;

	/**
	 * The Jackson object mapper for JSON.
	 */
	private ObjectMapper jsonMapper;

	/**
	 * Default constructor.
	 *
	 * @param serverProperties
	 */
	public Config(Properties serverProperties) {
		port = Integer.parseInt(serverProperties.getProperty("port", Integer.toString(DEFAULT_PORT)));
		caskDaysListUrl = serverProperties.getProperty("caskDaysListUrl", DEFAULT_CASK_DAYS_LIST_URL);
	}

	/**
	 * Port to listen on.
	 *
	 * @return the port
	 */
	public int getPort() {
		return port;
	}

	/**
	 * The Jackson object mapper for JSON.
	 *
	 * @return the jsonMapper
	 */
	public ObjectMapper getJsonMapper() {
		return jsonMapper;
	}

	/**
	 * The Jackson object mapper for JSON.
	 *
	 * @param jsonMapper the jsonMapper to set
	 */
	public void setJsonMapper(ObjectMapper jsonMapper) {
		this.jsonMapper = jsonMapper;
	}

	/**
	 * The web site to load.
	 * @return the caskDaysListUrl
	 */
	public String getCaskDaysListUrl() {
		return caskDaysListUrl;
	}
}

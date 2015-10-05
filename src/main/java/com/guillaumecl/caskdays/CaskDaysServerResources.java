package com.guillaumecl.caskdays;

import com.guillaumecl.caskdays.service.BeerListService;
import com.guillaumecl.caskdays.util.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CaskDaysServerResources extends ResourceConfig {
	/**
	 * Logger instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(CaskDaysServerResources.class);

	/**
	 * Creates the web application resource configurator
	 *
	 * @param config
	 */
	public CaskDaysServerResources(Config config) {
		register(JacksonFeature.class);

		register(new BeerListService(config));
	}
}

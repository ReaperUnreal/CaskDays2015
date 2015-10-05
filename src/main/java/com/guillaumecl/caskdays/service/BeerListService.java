package com.guillaumecl.caskdays.service;

import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.Beer;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * REST service for the beer list.
 * 
 * @author gcl
 */
@Path("/")
public class BeerListService {
	/**
	 * Logger instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(BeerListService.class);
	
	/**
	 * The config for the server.
	 */
	private final Config config;

	/**
	 * Create the service
	 * @param config
	 */
	public BeerListService(Config config) {
		this.config = config;
	}
	
	/**
	 * Get the list of beers.
	 *
	 * @return response
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/beers")
	public Response getBeers() {
		List<Beer> beerList = config.getBeerListStore().getList();
		if (beerList.isEmpty()) {
			logger.warn("Could not send beer list, list was empty.");
			return Response.serverError().build();
		}
		return Response.ok(beerList).build();
	}
	
}

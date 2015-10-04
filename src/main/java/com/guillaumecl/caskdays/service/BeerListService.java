package com.guillaumecl.caskdays.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
	private static final Logger lobbyLogger = LoggerFactory.getLogger(BeerListService.class);
	
	/**
	 * The replay string.
	 */
	private final String beerList;

	/**
	 * Create the service
	 */
	public BeerListService() {
		beerList = "test";
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
		return Response.ok(beerList).build();
	}
	
}

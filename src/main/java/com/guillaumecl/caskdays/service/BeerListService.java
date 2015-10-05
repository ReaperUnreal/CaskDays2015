package com.guillaumecl.caskdays.service;

import com.guillaumecl.caskdays.models.Beer;
import java.util.ArrayList;
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
	 * The replay string.
	 */
	private final List<Beer> beerList;

	/**
	 * Create the service
	 */
	public BeerListService() {
		Beer testBeer = new Beer("Some Shitty Beer", "Nowhere");
		beerList = new ArrayList<>();
		beerList.add(testBeer);
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

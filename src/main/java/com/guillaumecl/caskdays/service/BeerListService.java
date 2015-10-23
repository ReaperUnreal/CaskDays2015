package com.guillaumecl.caskdays.service;

import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.Beer;
import com.guillaumecl.caskdays.models.ChosenBeers;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

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
	 *
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

	/**
	 * Save a given beer list to redis.
	 *
	 * @param chosen
	 * @return response
	 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/savelist")
	public Response saveList(ChosenBeers chosen) {
		if (chosen == null) {
			logger.error("Sent an incorrect chosen beers.");
			return Response.status(Status.BAD_REQUEST).build();
		}
		Jedis jedis = config.getJedis();
		String key = config.getRedisPrefix() + chosen.getName();
		String value = chosen.getFlattenedIds();
		String rval = jedis.set(key, value);
		if (rval.equalsIgnoreCase("ok")) {
			return Response.ok(rval).build();
		} else {
			return Response.serverError().build();
		}
	}

	/**
	 * Get a given list from redis.
	 *
	 * @param name
	 * @return response
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getlist/{name}")
	public Response getList(@PathParam("name") String name) {
		Jedis jedis = config.getJedis();
		String key = config.getRedisPrefix() + name;
		String value = jedis.get(key);
		if (StringUtils.isBlank(value)) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		ChosenBeers beers = new ChosenBeers();
		beers.setName(name);
		beers.populateIdsFromFlattenedIds(value);
		return Response.ok(beers).build();
	}

}

package com.guillaumecl.caskdays.service;

import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.ChosenBeers;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

/**
 * Service for saving and loading from accounts.
 * 
 * @author gcl
 */
@Path("/accounts")
public class AccountService {
	
	/**
	 * Logger instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

	/**
	 * The config for the server.
	 */
	private final Config config;
	
	public AccountService(Config config) {
		this.config = config;
	}
	
	/**
	 * Save a given beer list to redis.
	 *
	 * @param name
	 * @param chosen
	 * @return response
	 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/{name}")
	public Response saveList(@PathParam("name") String name, ChosenBeers chosen) {
		if (chosen == null) {
			logger.error("Sent an incorrect chosen beers.");
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		Jedis jedis = config.getJedis();
		String key = config.getRedisPrefix() + name;
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
	@Path("/{name}")
	public Response getList(@PathParam("name") String name) {
		Jedis jedis = config.getJedis();
		String key = config.getRedisPrefix() + name;
		String value = jedis.get(key);
		if (StringUtils.isBlank(value)) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		ChosenBeers beers = new ChosenBeers();
		beers.populateIdsFromFlattenedIds(value);
		return Response.ok(beers).build();
	}
}

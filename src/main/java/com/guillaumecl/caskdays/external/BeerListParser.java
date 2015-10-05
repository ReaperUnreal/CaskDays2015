package com.guillaumecl.caskdays.external;

import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.Beer;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Will look up the beer list on the cask days web site and parse it into a real beer list.
 * 
 * @author gcl
 */
public class BeerListParser {
	private static final Logger logger = LoggerFactory.getLogger(BeerListParser.class);
	
	/**
	 * The server config.
	 */
	private final Config config;
	
	/**
	 * Whether or not the list has been initialized.
	 */
	private boolean initialized;
	
	/**
	 * The list of beers.
	 */
	private List<Beer> beerList;
	
	/**
	 * Construct a beer list parser.
	 * 
	 * @param config 
	 */
	public BeerListParser(Config config) {
		this.config = config;
		initialized = false;
		beerList = Collections.emptyList();
	}
	
	/**
	 * Return the list of beers, and if necessary, load them... synchronously.
	 * 
	 * @return The list of beers.
	 */
	public List<Beer> getList() {
		if (initialized) {
			return beerList;
		}
		Optional<String> maybeSite = getSite();
		if (! maybeSite.isPresent()) {
			logger.trace("Could not get site.");
			return beerList;
		}
		
		// get the site
		String site = maybeSite.get();
		logger.trace("site: {}", site);
		
		// get it as HTML
		Document dom = Jsoup.parse(site, config.getCaskDaysListUrl());
		
		// navigate the DOM to extract the list
		beerList = extractBeerList(dom);
		
		initialized = true;
		return beerList;
	}
	
	/**
	 * Extract the beer information from the DOM.
	 * 
	 * @param dom
	 * @return The list of beers that was found.
	 */
	private List<Beer> extractBeerList(Document dom) {
		return Collections.emptyList();
	}
	
	/**
	 * Get the actual page for the web site.
	 * 
	 * @return The text of the web site.
	 */
	private Optional<String> getSite() {
		String site;
		try {
			HttpResponse<String> response = Unirest.get(config.getCaskDaysListUrl()).asString();
			site = response.getBody();
		} catch (UnirestException ex) {
			logger.error("Could not get cask days site.", ex);
			return Optional.empty();
		}
		return Optional.ofNullable(site);
	}
}

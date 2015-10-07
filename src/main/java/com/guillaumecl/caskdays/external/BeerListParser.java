package com.guillaumecl.caskdays.external;

import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.Beer;
import com.guillaumecl.caskdays.spellcheck.SpellChecker;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
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
	 * The spell checker of the beer names.
	 */
	private final SpellChecker spellChecker;
	
	/**
	 * Construct a beer list parser.
	 * 
	 * @param config 
	 */
	public BeerListParser(Config config) {
		this.config = config;
		spellChecker = config.getSpellChecker();
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
		//logger.trace("site: {}", site);
		
		// get it as HTML
		Document dom = Jsoup.parse(site, config.getCaskDaysListUrl());
		
		// navigate the DOM to extract the list
		beerList = extractBeerList(dom);
		if (beerList.isEmpty()) {
			logger.warn("Beer list empty, not initialized.");
			return beerList;
		}
		
		initialized = true;
		return beerList;
	}
	
	/**
	 * Take the name of a section and make it pretty.
	 * 
	 * @param sectionName
	 * @return The prettified version of the section name.
	 */
	private String prettifySectionName(String sectionName) {
		String justName = StringUtils.strip(StringUtils.substringBefore(sectionName, "("));
		String capitalizedName = WordUtils.capitalizeFully(justName);
		
		// stupid special cases
		String properName = StringUtils.replaceEach(capitalizedName,
				new String[]{"Ipa", "P.e.i."},
				new String[]{"IPA", "P.E.I."});
		return properName;
	}
	
	/**
	 * Create some beers, but without section names from the section element.
	 * 
	 * @param section
	 * @return List of beers found in the section.
	 */
	private List<Beer> getBeersFromSection(Element section) {
		List<Beer> sectionBeers = section.select("div.menu-item").stream().map(element -> {
			String name = element.select("div.menu-item-title").text();
			String fixedName = spellChecker.correctPhrase(name);
			String style = element.select("div.menu-item-description").text();
			Beer beer = new Beer();
			beer.setName(fixedName);
			beer.setStyle(style);
			return beer;
		}).collect(Collectors.toList());
		return sectionBeers;
	}
	
	/**
	 * Find the section name.
	 * 
	 * @param heading
	 * @return The section name.
	 */
	private String getSectionTitleFromElement(Element heading) {
		String title = heading.select("h2").last().text();
		return prettifySectionName(title);
	}
	
	/**
	 * Extract the beer information from the DOM.
	 * 
	 * @param dom
	 * @return The list of beers that was found.
	 */
	private List<Beer> extractBeerList(Document dom) {
		Element mainPage = dom.select("main#page").first();
		Element listParent = mainPage.select("div.sqs-col-10").first();
		
		// get the sections
		Elements sectionHeadings = listParent.select("div[data-block-type=2]");
		Elements sectionContents = listParent.select("div[data-block-type=18]");
		if (sectionHeadings.size() != sectionContents.size()) {
			logger.error("Section headings and section contents don't have the same count: {} vs {}", sectionHeadings.size(), sectionContents.size());
			return Collections.emptyList();
		}
		logger.trace("num headings: {}, num contents: {}", sectionHeadings.size(), sectionContents.size());
		
		// get the beers together
		List<Beer> beers = IntStream.range(0, sectionHeadings.size())
				.mapToObj(idx -> Pair.of(sectionHeadings.get(idx), sectionContents.get(idx)))
				.flatMap(section -> {
					// section name
					Element heading = section.getLeft();
					String sectionName = getSectionTitleFromElement(heading);
					
					// beers in section
					Element content = section.getRight();
					List<Beer> sectionBeers = getBeersFromSection(content);
					
					// assign region
					return sectionBeers.stream().map(beer -> {
						beer.setRegion(sectionName);
						return beer;
					});
				})
				.filter(beer -> ! StringUtils.equalsIgnoreCase(beer.getName(), "to be announced"))
				.collect(Collectors.toList());
		
		return beers;
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

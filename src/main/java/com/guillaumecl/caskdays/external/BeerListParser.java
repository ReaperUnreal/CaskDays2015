package com.guillaumecl.caskdays.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.guillaumecl.caskdays.Config;
import com.guillaumecl.caskdays.models.Beer;
import com.guillaumecl.caskdays.spellcheck.SpellChecker;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.text.WordUtils;
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
	 * The styles that we can guess from.
	 */
	private final List<String> styleGuesses;
	
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
		styleGuesses = config.getStyleGuesses();
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
		
		// check to see if there's a cached file first
		String beerListFilePathStr = config.getBeerListFilePath();
		Path beerListFilePath = Paths.get(beerListFilePathStr);
		if (Files.exists(beerListFilePath)) {
			try {
				// cached file exists, load it
				byte[] content = Files.readAllBytes(beerListFilePath);
				JsonNode beers = config.getJsonMapper().readTree(content);
				beerList = new ArrayList<>();
				for (JsonNode beerNode : beers) {
					Beer beer = Beer.fromJSON(beerNode);
					beerList.add(beer);
				}
				initialized = true;
				return beerList;
			} catch (IOException ex) {
				logger.error("Could not read file for beer list.", ex);
			}
		}
		
		
		// no cached file, try to parse all the stuff from the web site
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
	 * Couldn't find the style name, it's probably embedded try and guess it. This list
	 * is built through manual exploration.
	 * 
	 * @param nameAndStyle
	 * @return The style if we could guess.
	 */
	private Optional<String> guessStyle(String nameAndStyle) {
		return styleGuesses.stream()
				.filter(guess -> StringUtils.containsIgnoreCase(nameAndStyle, guess))
				.findFirst();
	}
	
	/**
	 * Parse a beer from the menu item.
	 * 
	 * @param item
	 * @return The parsed out beer.
	 */
	private Optional<Beer> getBeerFromMenuItem(Element item) {
		String brewery = spellChecker.correctPhrase(item.getElementsByClass("menu-item-title").first().text());
		String nameAndStyle = item.getElementsByClass("menu-item-description").first().text();
		String parts[] = StringUtils.split(nameAndStyle, ",", 2);
		String name;
		String style;
		if (parts.length != 2) {
			logger.debug("Could not split name and style of \"{}\" by \"{}\", guessing.", nameAndStyle, brewery);
			Optional<String> maybeStyle = guessStyle(nameAndStyle);
			if (maybeStyle.isPresent()) {
				name = nameAndStyle;
				style = maybeStyle.get();
			} else {
				logger.warn("Could not split name and style of \"{}\" by \"{}\", returning empty.", nameAndStyle, brewery);
				return Optional.empty();
			}
		} else {
			name = spellChecker.correctPhrase(parts[0].trim());
			style = spellChecker.correctPhrase(parts[1].trim());
		}
		
		Element idElement = item.getElementsByClass("menu-item-price-top").first();
		String idStr = null;
		if (idElement == null) {
			if (name.equals("Dry Hopped Aviator Red") && brewery.equals("Flying Bison Brewing Company")) {
				// data entry is apparently hard
				idStr = "90";
			} else {
				logger.warn("Could not find node for id of \"{}\" by \"{}\"", name, brewery);
				return Optional.empty();
			}
		}
		if (idStr == null && idElement != null) {
			idStr = idElement.text();
		}
		int id = NumberUtils.toInt(idStr, 9999);
		if (id == 9999) {
			logger.warn("Could not parse id of \"{}\" by \"{}\", got: \"{}\"", name, brewery, idStr);
			return Optional.empty();
		}
		
		return Optional.of(new Beer(id, brewery, name, style));
	}
	
	/**
	 * Create some beers, but without section names from the section element.
	 * 
	 * @param section
	 * @return List of beers found in the section.
	 */
	private Stream<Beer> getBeersFromSection(Element section) {
		Element menuItemsRoot = section.getElementsByClass("menu-items").first();
		return menuItemsRoot.getElementsByClass("menu-item").stream()
				.map(this::getBeerFromMenuItem)
				.filter(Optional::isPresent)
				.map(Optional::get);
	}
	
	/**
	 * Find the section name.
	 * 
	 * @param heading
	 * @return The section name.
	 */
	private String getSectionTitleFromSection(Element section) {
		String title = section.getElementsByClass("menu-section-title").first().text();
		return prettifySectionName(title);
	}
	
	/**
	 * Parse an individual section of beer.
	 * 
	 * @param section
	 * @return The beers in the section.
	 */
	private Stream<Beer> parseSection(Element section) {
		String sectionName = getSectionTitleFromSection(section);
		return getBeersFromSection(section).map(beer -> {
			beer.setRegion(sectionName);
			return beer;
		});
	}
	
	/**
	 * Extract the beer information from the DOM.
	 * 
	 * @param dom
	 * @return The list of beers that was found.
	 */
	private List<Beer> extractBeerList(Document dom) {
		Element menus = dom.getElementsByClass("menus").first();
		Elements sections = menus.getElementsByClass("menu-section");
		
		return sections.stream()
				.flatMap(this::parseSection)
				.collect(Collectors.toList());
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

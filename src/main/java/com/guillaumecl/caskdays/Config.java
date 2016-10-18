package com.guillaumecl.caskdays;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.guillaumecl.caskdays.external.BeerListParser;
import com.guillaumecl.caskdays.spellcheck.SpellChecker;
import java.util.List;
import java.util.Properties;
import redis.clients.jedis.Jedis;

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
	 * Default path to the spelling corrections file.
	 */
	private static final String DEFAULT_SPELLING_CORRECTIONS_FILE_PATH = "config/corrections.txt";

	/**
	 * Default path to the saved list file.
	 */
	private static final String DEFAULT_BEER_LIST_JSON_FILE_PATH = "config/list.json";

	/**
	 * The default prefix for redis.
	 */
	private static final String DEFAULT_REDIS_PREFIX = "CD2015";

	/**
	 * Default path to the style guesses.
	 */
	private static final String DEFAULT_STYLE_GUESSES_FILE_PATH = "config/style_guesses.txt";

	/**
	 * Port to listen on.
	 */
	private final int port;

	/**
	 * The web site to load.
	 */
	private final String caskDaysListUrl;

	/**
	 * The file to load.
	 */
	private final String beerListFilePath;

	/**
	 * The file with the list of spelling corrections.
	 */
	private final String spellingCorrectionsFilePath;

	/**
	 * The prefix for all of our redis keys.
	 */
	private final String redisPrefix;

	/**
	 * The file with the list of style guesses.
	 */
	private final String styleGuessesFilePath;

	/**
	 * The Jackson object mapper for JSON.
	 */
	private ObjectMapper jsonMapper;

	/**
	 * The beer list store.
	 */
	private BeerListParser beerListStore;

	/**
	 * The spell checker.
	 */
	private SpellChecker spellChecker;

	/**
	 * The list of styles to guess.
	 */
	private List<String> styleGuesses;

	/**
	 * The jedis client.
	 */
	private Jedis jedis;

	/**
	 * Default constructor.
	 *
	 * @param serverProperties
	 */
	public Config(Properties serverProperties) {
		port = Integer.parseInt(serverProperties.getProperty("port", Integer.toString(DEFAULT_PORT)));
		caskDaysListUrl = serverProperties.getProperty("caskDaysListUrl", DEFAULT_CASK_DAYS_LIST_URL);
		spellingCorrectionsFilePath = serverProperties.getProperty("spellingFilePath", DEFAULT_SPELLING_CORRECTIONS_FILE_PATH);
		beerListFilePath = serverProperties.getProperty("beerListFilePath", DEFAULT_BEER_LIST_JSON_FILE_PATH);
		styleGuessesFilePath = serverProperties.getProperty("styleGuessesFilePath", DEFAULT_STYLE_GUESSES_FILE_PATH);
		redisPrefix = serverProperties.getProperty("redisPrefix", DEFAULT_REDIS_PREFIX);
	}

	/**
	 * The file to load.
	 *
	 * @return the beerListFilePath
	 */
	public String getBeerListFilePath() {
		return beerListFilePath;
	}
	
	/**
	 * The styles to guess.
	 * 
	 * @return the styleGuessesFilePath 
	 */
	public String getStyleGuessesFilePath() {
		return styleGuessesFilePath;
	}

	/**
	 * The prefix for all of our redis keys.
	 *
	 * @return the redisPrefix
	 */
	public String getRedisPrefix() {
		return redisPrefix;
	}

	/**
	 * The file with the list of spelling corrections.
	 *
	 * @return the spellingCorrectionsFilePath
	 */
	public String getSpellingCorrectionsFilePath() {
		return spellingCorrectionsFilePath;
	}

	/**
	 * The spell checker.
	 *
	 * @return the spellChecker
	 */
	public SpellChecker getSpellChecker() {
		return spellChecker;
	}

	/**
	 * The spell checker.
	 *
	 * @param spellChecker the spellChecker to set
	 */
	public void setSpellChecker(SpellChecker spellChecker) {
		this.spellChecker = spellChecker;
	}

	/**
	 * The jedis client.
	 *
	 * @return the jedis
	 */
	public Jedis getJedis() {
		return jedis;
	}

	/**
	 * The jedis client.
	 *
	 * @param jedis the jedis to set
	 */
	public void setJedis(Jedis jedis) {
		this.jedis = jedis;
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
	 *
	 * @return the caskDaysListUrl
	 */
	public String getCaskDaysListUrl() {
		return caskDaysListUrl;
	}

	/**
	 * The beer list store.
	 *
	 * @return the beerListStore
	 */
	public BeerListParser getBeerListStore() {
		return beerListStore;
	}

	/**
	 * The beer list store.
	 *
	 * @param beerListStore the beerListStore to set
	 */
	public void setBeerListStore(BeerListParser beerListStore) {
		this.beerListStore = beerListStore;
	}

	/**
	 * The list of styles to guess.
	 *
	 * @return the styleGuesses
	 */
	public List<String> getStyleGuesses() {
		return styleGuesses;
	}

	/**
	 * The list of styles to guess.
	 *
	 * @param styleGuesses the styleGuesses to set
	 */
	public void setStyleGuesses(List<String> styleGuesses) {
		this.styleGuesses = styleGuesses;
	}
}

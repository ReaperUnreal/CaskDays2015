package com.guillaumecl.caskdays.spellcheck;

import com.guillaumecl.caskdays.Config;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.LoggerFactory;

/**
 * Fix all the spelling mistakes in the beer list.
 *
 * @author gcl
 */
public class SpellChecker {

	/**
	 * Logger instance
	 */
	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(SpellChecker.class);

	/**
	 * The config for the server.
	 */
	private final Config config;

	/**
	 * The list of words that are incorrect.
	 */
	private String[] badWords;

	/**
	 * The list of the bad words, corrected.
	 */
	private String[] correctedWords;

	/**
	 * Create the spell checker.
	 *
	 * @param config
	 */
	public SpellChecker(Config config) {
		this.config = config;
	}

	/**
	 * Load all the fixes from disk.
	 */
	public void loadFixes() {
		String pathStr = config.getSpellingCorrectionsFilePath();
		Path path = Paths.get(pathStr);

		// check for the file at all
		if (!Files.exists(path, LinkOption.NOFOLLOW_LINKS)) {
			logger.info("No spelling corrections file found, assuming no corrections.");
			badWords = new String[0];
			correctedWords = new String[0];
			return;
		}

		// load the entire file
		Stream<String> lines;
		try {
			lines = Files.lines(path);
		} catch (IOException ex) {
			logger.error("Got an exception while trying to load corrections file from disk.", ex);
			badWords = new String[0];
			correctedWords = new String[0];
			return;
		}

		// map it together
		Map<String, String> wordPairs = lines
				.map(line -> {
					String[] items = StringUtils.splitByWholeSeparator(line, "|", 2);
					if (items.length != 2) {
						return Pair.of(null, null);
					}
					String bad = items[0];
					String correct = items[1];
					return Pair.of(bad, correct);
				})
				.filter(pair -> pair.getLeft() != null && pair.getRight() != null)
				.collect(Collectors.toMap(pair -> (String)pair.getLeft(), pair -> (String)pair.getRight()));
		badWords = wordPairs.keySet().toArray(new String[0]);
		
		int numWords = badWords.length;
		correctedWords = new String[numWords];
		for (int idx = 0; idx < numWords; idx++) {
			correctedWords[idx] = wordPairs.getOrDefault(badWords[idx], badWords[idx]);
		}
		
	}

	/**
	 * Correct the phrase with all the fixes.
	 *
	 * @param phrase
	 * @return The fixed up phrase.
	 */
	public String correctPhrase(String phrase) {
		String fixed = StringUtils.replaceEachRepeatedly(phrase, badWords, correctedWords);
		return fixed;
	}
}

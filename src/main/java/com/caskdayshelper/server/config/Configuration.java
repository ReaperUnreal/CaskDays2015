package com.caskdayshelper.server.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

/**
 * Helper class to load configuration
 */
public class Configuration {
    private static final Logger logger = LoggerFactory.getLogger(Configuration.class);

    /**
     * Load properties from paths in order, stopping after the first successful load.  The final attempt
     * is made to an embedded properties file given by the embeddedPath argument.  If none of the given
     * paths can be used to load properties, an empty properties object is returned.
     *
     * @param embeddedPath path within a jar to load properties from
     * @param paths list of paths to try to load properties from in priority order
     * @return loaded properties
     */
    public static Properties loadConfiguration(String embeddedPath, String... paths) {
        Properties properties = new Properties();

        for (String path1 : paths) {
            Path path = Paths.get(path1);
            if (Files.notExists(path)) {
                logger.info("Path does not exist: {}", path);
                continue;
            }

            try {
                properties.load(Files.newBufferedReader(path));
                return properties;
            } catch (IOException ioe) {
                logger.error("Failed to read path: {}", path);
            }
        }

        try {
            InputStream resourceStream = Configuration.class.getResourceAsStream(embeddedPath);
            if (null == resourceStream) {
                logger.info("Could not find default config file at {}", embeddedPath);
            } else {
                properties.load(resourceStream);
            }
        } catch (IOException ioe) {
            logger.error("Could not read default config file at {}", embeddedPath, ioe);
        }

        return properties;
    }
}

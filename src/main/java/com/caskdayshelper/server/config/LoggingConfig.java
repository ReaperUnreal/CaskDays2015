package com.caskdayshelper.server.config;

import java.io.File;

import org.apache.log4j.PropertyConfigurator;

public class LoggingConfig {

    /**
     * Configure log4j.
     */
    public static void configureLog4j() {
        // Then check for config file
        File log4jFile = new File("config/log4j.properties");
        PropertyConfigurator.configureAndWatch(log4jFile.getAbsolutePath());
    }

}


#!/bin/bash
mvn clean install && scp -C target/server-0.0.1-SNAPSHOT.jar gcl@68.183.202.229:/var/www/caskdayshelper.com/server/server.jar

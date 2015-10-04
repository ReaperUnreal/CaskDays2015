package com.guillaumecl.caskdays.models;

/**
 * Model for a beer.
 *
 * @author gcl
 */
public class Beer {

	/**
	 * The name of the beer, including the brewery.
	 */
	private String name;

	/**
	 * The region the beer is from.
	 */
	private String region;

	/**
	 * Default constructor for Jackson.
	 */
	public Beer() {
	}

	/**
	 * Full fledged constructor for manual creation.
	 *
	 * @param name
	 * @param region
	 */
	public Beer(String name, String region) {
		this.name = name;
		this.region = region;
	}

	/**
	 * The name of the beer, including the brewery.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * The name of the beer, including the brewery.
	 *
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * The region the beer is from.
	 *
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}

	/**
	 * The region the beer is from.
	 *
	 * @param region the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}

}

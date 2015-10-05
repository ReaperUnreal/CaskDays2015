package com.guillaumecl.caskdays.models;

import org.apache.commons.lang3.StringUtils;

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
	 * The style of the beer.
	 */
	private String style;

	/**
	 * Default constructor for Jackson.
	 */
	public Beer() {
	}

	/**
	 * Full fledged constructor for manual creation.
	 *
	 * @param name
	 * @param style
	 * @param region
	 */
	public Beer(String name, String style, String region) {
		this.name = name;
		this.region = region;
	}

	/**
	 * The style of the beer.
	 *
	 * @return the style
	 */
	public String getStyle() {
		return style;
	}

	/**
	 * The style of the beer.
	 *
	 * @param style the style to set
	 */
	public void setStyle(String style) {
		this.style = style;
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
	
	/**
	 * Custom toString to make things pretty.
	 * 
	 * @return The prettified beer.
	 */
	@Override
	public String toString() {
		return name + ", " + style + " from " + StringUtils.defaultString(region, "Unknown");
	}

}

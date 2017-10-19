package com.guillaumecl.caskdays.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Someone's chosen beers.
 *
 * @author gcl
 */
@XmlRootElement
public class ChosenBeers {

	/**
	 * The chosen ids.
	 */
	private List<Integer> chosenIds;

	/**
	 * Empty constructor for Jackson
	 */
	public ChosenBeers() {
	}

	/**
	 * Full fledged constructor for manual creation.
	 *
	 * @param chosenIds
	 */
	public ChosenBeers(List<Integer> chosenIds) {
		this.chosenIds = chosenIds;
	}
	
	/**
	 * Get all of the ids as a nice string.
	 * 
	 * @return The ids in a comma-delimited string.
	 */
	@JsonIgnore
	public String getFlattenedIds() {
		String ids = chosenIds
				.stream()
				.map(i -> i.toString())
				.collect(Collectors.joining(","));
		return ids;
	}
	
	/**
	 * Use a list of flattened ids to get a list of ids.
	 * 
	 * @param ids 
	 */
	public void populateIdsFromFlattenedIds(String ids) {
		chosenIds = Arrays
				.stream(ids.split(","))
				.map(Integer::valueOf)
				.collect(Collectors.toList());
	}

	/**
	 * The chosen ids.
	 *
	 * @return the chosenIds
	 */
	public List<Integer> getChosenIds() {
		return chosenIds;
	}

	/**
	 * The chosen ids.
	 *
	 * @param chosenIds the chosenIds to set
	 */
	public void setChosenIds(List<Integer> chosenIds) {
		this.chosenIds = chosenIds;
	}

	/**
	 * See what's inside.
	 * 
	 * @return The chosen beers as a string.
	 */
	@Override
	public String toString() {
		return "ChosenBeers{ chosenIds=" + chosenIds + '}';
	}
}

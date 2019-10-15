var beerList = [
  {
    "id": "1",
    "session": "S1",
    "region": "Maine",
    "brewery": "Allagash",
    "name": "Helena",
    "style": "Flemish Red",
    "abv": "7.1"
  },
  {
    "id": "2",
    "session": "S3",
    "region": "Maine",
    "brewery": "Allagash",
    "name": "Pick Your Own",
    "style": "Fruited Sour Red Ale",
    "abv": "6"
  },
  {
    "id": "3",
    "session": "S1",
    "region": "Maine",
    "brewery": "Bunker",
    "name": "Green Mind",
    "style": "Pale Ale",
    "abv": "5"
  },
  {
    "id": "4",
    "session": "S1",
    "region": "Maine",
    "brewery": "Bunker",
    "name": "Out There",
    "style": "Wet-Hopped Lager",
    "abv": "5.6"
  },
  {
    "id": "5",
    "session": "S1",
    "region": "Maine",
    "brewery": "Liquid Riot",
    "name": "All Is Illusion, Double Dry Hopped",
    "style": "Beer",
    "abv": "7.8"
  },
  {
    "id": "6",
    "session": "S1",
    "region": "Maine",
    "brewery": "Liquid Riot",
    "name": "Triple, Surprise!",
    "style": "Beer",
    "abv": "8"
  },
  {
    "id": "7",
    "session": "S3",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "Keller Luppolo",
    "style": "Pils",
    "abv": "5"
  },
  {
    "id": "8",
    "session": "S3",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "Zwickel Luppolo",
    "style": "Pils",
    "abv": "5"
  },
  {
    "id": "9",
    "session": "S1",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "Extra Hop Luppolo",
    "style": "Pils",
    "abv": "5"
  },
  {
    "id": "10",
    "session": "S1",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "Bluppolo",
    "style": "Pils",
    "abv": "5"
  },
  {
    "id": "11",
    "session": "S1",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "FPA",
    "style": "Saison",
    "abv": "6"
  },
  {
    "id": "12",
    "session": "S1",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "FPHoney",
    "style": "Saison",
    "abv": "6"
  },
  {
    "id": "13",
    "session": "S3",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "S. Hemisphere FPA",
    "style": "Saison",
    "abv": "6"
  },
  {
    "id": "14",
    "session": "S3",
    "region": "Maine",
    "brewery": "Oxbow",
    "name": "Whole Leaf FPA",
    "style": "Saison",
    "abv": "6"
  },
  {
    "id": "15",
    "session": "S1",
    "region": "Maine",
    "brewery": "Rising Tide",
    "name": "Zephyr",
    "style": "IPA",
    "abv": "6.3"
  },
  {
    "id": "16",
    "session": "S1",
    "region": "Maine",
    "brewery": "Rising Tide",
    "name": "Tiller",
    "style": "Spiced Dark Lager",
    "abv": "6"
  },
  {
    "id": "17",
    "session": "S1",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Gose",
    "style": "Gose",
    "abv": "4.5"
  },
  {
    "id": "18",
    "session": "S3",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "LostOber Fest",
    "style": "Oktoberfest",
    "abv": "5.9"
  },
  {
    "id": "19",
    "session": "S3",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Tossing Seeds Citra DIPA",
    "style": "DIPA",
    "abv": "8"
  },
  {
    "id": "20",
    "session": "S1",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Roll Away IPA",
    "style": "IPA",
    "abv": "6.5"
  },
  {
    "id": "21",
    "session": "S1",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "The Wind Blue",
    "style": "Gose",
    "abv": "4.5"
  },
  {
    "id": "22",
    "session": "S1",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Vermont Pilsner",
    "style": "Pilsner",
    "abv": "4.8"
  },
  {
    "id": "23",
    "session": "S3",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Mosaic IPA",
    "style": "IPA",
    "abv": "5.5"
  },
  {
    "id": "24",
    "session": "S3",
    "region": "Vermont",
    "brewery": "Lost Nation",
    "name": "Lost Galaxy IPA",
    "style": "Session IPA",
    "abv": "4.8"
  },
  {
    "id": "25",
    "session": "S1",
    "region": "New York",
    "brewery": "Barrier",
    "name": "O-Ren Rishi",
    "style": "IPA",
    "abv": "6.8"
  },
  {
    "id": "26",
    "session": "S1",
    "region": "New York",
    "brewery": "Barrier",
    "name": "Money",
    "style": "IPA",
    "abv": "7.4"
  },
  {
    "id": "27",
    "session": "S1",
    "region": "New York",
    "brewery": "Barrier",
    "name": "#4#",
    "style": "IPA",
    "abv": "7.5"
  },
  {
    "id": "28",
    "session": "S3",
    "region": "New York",
    "brewery": "Barrier",
    "name": "Shadows & Dust",
    "style": "DDH IPA",
    "abv": "7.6"
  },
  {
    "id": "29",
    "session": "S1",
    "region": "New York",
    "brewery": "Other Half",
    "name": "More Citra Than All Citra w. Peach Gummi Rings",
    "style": "DIPA w. Candyyyyyy",
    "abv": "10.5"
  },
  {
    "id": "30",
    "session": "S3",
    "region": "New York",
    "brewery": "Other Half",
    "name": "DDH Double Cashmere Daydream",
    "style": "Oat Cream DIPA w. Watermelon Gummi Candy",
    "abv": "8.3"
  },
  {
    "id": "31",
    "session": "S1",
    "region": "New York",
    "brewery": "SingleCut Beersmiths",
    "name": "Half Stack w. Mosaic",
    "style": "IPA",
    "abv": "6.6"
  },
  {
    "id": "32",
    "session": "S3",
    "region": "New York",
    "brewery": "SingleCut Beersmiths",
    "name": "Jackknifed Juggernaut DDH IPA w. Pacifica",
    "style": "IPA",
    "abv": "7"
  },
  {
    "id": "33",
    "session": "S1",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Seeing In Triple Vision",
    "style": "IPA",
    "abv": "11"
  },
  {
    "id": "34",
    "session": "S1",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Burning Money",
    "style": "NEIPA",
    "abv": "6.6"
  },
  {
    "id": "35",
    "session": "S1",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Posh Blanc",
    "style": "Dry Hopped Pils",
    "abv": "4.9"
  },
  {
    "id": "36",
    "session": "S1",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Peanutbutter Jenkins",
    "style": "Imperial Stout",
    "abv": "11.7"
  },
  {
    "id": "37",
    "session": "S3",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Embiggen #2",
    "style": "NEIPA",
    "abv": "7"
  },
  {
    "id": "38",
    "session": "S3",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "My Girl Sasha",
    "style": "American Wheat",
    "abv": "5.6"
  },
  {
    "id": "39",
    "session": "S1",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Twilight Sparkle",
    "style": "Dry Hopped Fruited Sour",
    "abv": "6"
  },
  {
    "id": "40",
    "session": "S3",
    "region": "New York",
    "brewery": "Thin Man",
    "name": "Minkey Boodle",
    "style": "Raspberry Sour",
    "abv": "7"
  },
  {
    "id": "41",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Crime & Punishment",
    "name": "Pig's Ear",
    "style": "Ordinary Bitter",
    "abv": "4.6"
  },
  {
    "id": "42",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Fermentery Form",
    "name": "FOOZ",
    "style": "Firkin",
    "abv": "5"
  },
  {
    "id": "43",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Forest & Main",
    "name": "Broken Ground",
    "style": "Pub Ale",
    "abv": "4.5"
  },
  {
    "id": "44",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Forest & Main",
    "name": "Mr. Uncle",
    "style": "British-Style Pale Ale",
    "abv": "5"
  },
  {
    "id": "45",
    "session": "S3",
    "region": "Pennsylvania",
    "brewery": "Forest & Main",
    "name": "Steeper Dive",
    "style": "Bitter",
    "abv": "2.5"
  },
  {
    "id": "46",
    "session": "S3",
    "region": "Pennsylvania",
    "brewery": "Forest & Main",
    "name": "Three Snakes",
    "style": "DIPA",
    "abv": "8"
  },
  {
    "id": "47",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Hidden River",
    "name": "Community With Propinquity",
    "style": "Dark Mild",
    "abv": "4.8"
  },
  {
    "id": "48",
    "session": "S1",
    "region": "Pennsylvania",
    "brewery": "Second District",
    "name": "Smoater",
    "style": "Smoked Porter",
    "abv": "5.1"
  },
  {
    "id": "49",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Call To Arms",
    "name": "Janet Reno's Dance Party",
    "style": "Session IPA",
    "abv": "5.4"
  },
  {
    "id": "50",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Crooked Stave",
    "name": "Rosemary Brett Saison",
    "style": "Brett Saison",
    "abv": "7.1"
  },
  {
    "id": "51",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Crooked Stave",
    "name": "Orange & Cardamom Petite Sour",
    "style": "Oak Aged Wild Ale",
    "abv": "4.2"
  },
  {
    "id": "52",
    "session": "S3",
    "region": "Colorado",
    "brewery": "Crooked Stave",
    "name": "Strawberry Ginger Hibiscus Petite Sour",
    "style": "Oak Aged Wild Ale",
    "abv": "4.2"
  },
  {
    "id": "53",
    "session": "S3",
    "region": "Colorado",
    "brewery": "Crooked Stave",
    "name": "Vine Pilsner",
    "style": "Oenobeer",
    "abv": "5"
  },
  {
    "id": "54",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Hogshead",
    "name": "Lake Lightning Pale Ale",
    "style": "Pale Ale",
    "abv": "5"
  },
  {
    "id": "55",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Hogshead",
    "name": "The John Shaft",
    "style": "Cacao Porter",
    "abv": "5.6"
  },
  {
    "id": "56",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Little Machine",
    "name": "Razz Against The Machine",
    "style": "Tart Raspberry Beer",
    "abv": "5.3"
  },
  {
    "id": "57",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Primitive Beer",
    "name": "Unbroken Boulevard Of Green Lights",
    "style": "American Spontaneous Beer",
    "abv": "5.5"
  },
  {
    "id": "58",
    "session": "S3",
    "region": "Colorado",
    "brewery": "Primitive Beer",
    "name": "Parallel Thoughts",
    "style": "American Spontaneous Beer",
    "abv": "6"
  },
  {
    "id": "59",
    "session": "S1",
    "region": "Colorado",
    "brewery": "West Bound And Down",
    "name": "Golden Sour",
    "style": "Sour",
    "abv": "5"
  },
  {
    "id": "60",
    "session": "S1",
    "region": "Colorado",
    "brewery": "West Bound And Down",
    "name": "Colorado Saison",
    "style": "Saison",
    "abv": "7"
  },
  {
    "id": "61",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Wit's End",
    "name": "Green Man IPA",
    "style": "Pacific Northwest IPA",
    "abv": "6.5"
  },
  {
    "id": "62",
    "session": "S1",
    "region": "Colorado",
    "brewery": "Wit's End",
    "name": "Super FLi.P.A.",
    "style": "Black IPA",
    "abv": "6.8"
  },
  {
    "id": "63",
    "session": "S1",
    "region": "Washington",
    "brewery": "Garden Path Fermentation",
    "name": "Ron's Not Bitter. (2nd Edition)",
    "style": "A Skagitonian Bitter. Or Not.",
    "abv": "4.2"
  },
  {
    "id": "64",
    "session": "S3",
    "region": "Washington",
    "brewery": "Garden Path Fermentation",
    "name": "The Wet Hopped Ship. (2nd Edition)",
    "style": "A Skagitonian Fresh Hop Ale",
    "abv": "5.7"
  },
  {
    "id": "65",
    "session": "S1",
    "region": "Washington",
    "brewery": "Holy Mountain",
    "name": "Citra Fresh Hop",
    "style": "IPA",
    "abv": "7"
  },
  {
    "id": "66",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Best Bitter",
    "style": "Best Bitter",
    "abv": "4.2"
  },
  {
    "id": "67",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Dark Mild",
    "style": "Dark Mild",
    "abv": "3.7"
  },
  {
    "id": "68",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Golden Ale",
    "style": "English Pale Ale",
    "abv": "4.5"
  },
  {
    "id": "69",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Autumn Bitter",
    "style": "Best Bitter",
    "abv": "4"
  },
  {
    "id": "70",
    "session": "S3",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Fresh Hop Simcoe Session",
    "style": "Fresh Hop Session Pale",
    "abv": "4"
  },
  {
    "id": "71",
    "session": "S3",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Fresh Hop Mosaic Pale",
    "style": "Fresh Hop Pale Ale",
    "abv": "5"
  },
  {
    "id": "72",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Simcoe IPA",
    "style": "IPA",
    "abv": "6"
  },
  {
    "id": "73",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Mosaic Table Beer",
    "style": "Session Pale Ale",
    "abv": "3.1"
  },
  {
    "id": "74",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Porter",
    "style": "English Brown Porter",
    "abv": "5.4"
  },
  {
    "id": "75",
    "session": "S1",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Barleywine",
    "style": "English Barleywine",
    "abv": "10.5"
  },
  {
    "id": "76",
    "session": "S3",
    "region": "Washington",
    "brewery": "Machine House",
    "name": "Export India Porter",
    "style": "Export India Porter",
    "abv": "5.3"
  },
  {
    "id": "77",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Cascade",
    "name": "Makin' Money Moves",
    "style": "Barrel Aged Imperial Milk Stout",
    "abv": "9"
  },
  {
    "id": "78",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Cascade",
    "name": "Coco Rojo",
    "style": "Blend Of Sour Red Ales w. Cocao, Elderberries & Spices",
	  "abv": "6.6"
  },{
	  "id":"79",
	  "session":"S1",
	  "region":"Oregon",
	  "brewery":"Cascade",
	  "name":"Pistil Whipped"
	  ,"style":"Barrel Aged Sour Blonde Ale w. Saffron & Chamomile",
	  "abv":"7.7"
  },{
	  "id":"80"
	  ,"session":"S3"
	  ,"region":"Oregon"
	  ,"brewery":"Cascade"
	  ,"name":"Tartini Twist"
	  ,"style":"Barrel Aged Sour Ales Infused w. Gin Botanicals & Fresh Orange Zest"
	  ,"abv":"9.4"
  },{
	  "id":"81",
	  "session":"S3",
	  "region":"Oregon",
	  "brewery":"Cascade",
	  "name":"Pinot De Cerise",
	  "style":"Barrel Aged Sour w. Pinot Noir Juice & Bing Cherries"
	  ,"abv":"10.2"
  },{
	  "id":"82",
	  "session":"S3",
	  "region":"Oregon",
	  "brewery":"Cascade",
	  "name":"Porter-Pourri",
	  "style":"Barrel Aged Sour w. Rose Hips, Rose Petals & Hibiscus",
	  "abv":"7"
  },
  {
    "id": "83",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Cascade",
    "name": "Cuvee Du Jongleur",
    "style": "Barrel Aged Sour",
    "abv": "9.4"
  },
  {
    "id": "84",
    "session": "S3",
    "region": "Oregon",
    "brewery": "Hair Of The Dog",
    "name": "Maple Fred",
    "style": "Bourbon Barrel Aged American Strong Ale",
    "abv": "10"
  },
  {
    "id": "85",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Hair Of The Dog",
    "name": "Fred Flanders",
    "style": "Strong Golden Ale Aged In French Oak For 10 Years",
    "abv": "11"
  },
  {
    "id": "86",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Hair Of The Dog",
    "name": "Bourbon Fred From The Stone",
    "style": "Strong Golden Ale Fermented In Concrete Egg & Bourbon Barrels",
    "abv": "12"
  },
  {
    "id": "87",
    "session": "S1",
    "region": "Oregon",
    "brewery": "Hair Of The Dog X Big Island",
    "name": "Golden Sabbath",
    "style": "Bourbon Barrel Aged Belgian Golden Ale w. Hawaiian Honey",
    "abv": "12"
  },
  {
    "id": "88",
    "session": "S3",
    "region": "Oregon",
    "brewery": "Hair Of The Dog",
    "name": "Doggie Claws '19",
    "style": "American Barleywine w. Wildflower Honey",
    "abv": "11.5"
  },
  {
    "id": "89",
    "session": "S1",
    "region": "California",
    "brewery": "Beachwood BBQ",
    "name": "Laurel",
    "style": "IPA",
    "abv": "7.1"
  },
  {
    "id": "90",
    "session": "S1",
    "region": "California",
    "brewery": "Cellador",
    "name": "Famille w. Hibiscus",
    "style": "Small Oat Saison w. Hibiscus",
    "abv": "3.8"
  },
  {
    "id": "91",
    "session": "S3",
    "region": "California",
    "brewery": "Cellador",
    "name": "Breezeblocks",
    "style": "Open Fermented Saison",
    "abv": "7.1"
  },
  {
    "id": "92",
    "session": "S1",
    "region": "California",
    "brewery": "Smog City",
    "name": "Smog City IPA",
    "style": "American IPA",
    "abv": "7.3"
  },
  {
    "id": "93",
    "session": "S1",
    "region": "California",
    "brewery": "Smog City",
    "name": "Little Bo Pils",
    "style": "Pilsner",
    "abv": "4.4"
  },
  {
    "id": "94",
    "session": "S1",
    "region": "California",
    "brewery": "Smog City",
    "name": "Bloody Knuckle",
    "style": "Robust Porter",
    "abv": "6"
  },
  {
    "id": "95",
    "session": "S1",
    "region": "California",
    "brewery": "Yorkshire Square",
    "name": "Dirty Leeds",
    "style": "Proper Brown Beer",
    "abv": "5.3"
  },
  {
    "id": "96",
    "session": "S1",
    "region": "California",
    "brewery": "Yorkshire Square",
    "name": "How Heavy This Mash",
    "style": "English Barleywine",
    "abv": "10"
  },
  {
    "id": "97",
    "session": "S3",
    "region": "California",
    "brewery": "Yorkshire Square",
    "name": "Early Doors",
    "style": "Pub Bitter",
    "abv": "3.6"
  },
  {
    "id": "98",
    "session": "S3",
    "region": "California",
    "brewery": "Yorkshire Square",
    "name": "Drift Catcher",
    "style": "Proper Dark Ale",
    "abv": "4.3"
  },
  {
    "id": "99",
    "session": "S1",
    "region": "United Kingdom",
    "brewery": "Cloudwater",
    "name": "When The Wind Blows, Let It Blow",
	  "style": "Amber Ale",
	  "abv":"5.1"
  },
  {
    "id": "100",
    "session": "S1",
    "region": "United Kingdom",
    "brewery": "Cloudwater",
    "name": "Invention And Other Tools",
    "style": "Pale Ale",
    "abv": "4.5"
  },
  {
    "id": "101",
    "session": "S3",
    "region": "United Kingdom",
    "brewery": "Cloudwater",
    "name": "Proper",
    "style": "Export Stout",
    "abv": "6.2"
  },
  {
    "id": "102",
    "session": "S3",
    "region": "United Kingdom",
    "brewery": "Cloudwater",
    "name": "Is There Room In The Budget For A Sports Car?",
    "style": "Munich Malt Pale Ale",
    "abv": "4.6"
  },
  {
    "id": "103",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "2 Crows",
    "name": "Aquifolium",
    "style": "Wild Saison",
    "abv": "5.4"
  },
  {
    "id": "104",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "2 Crows",
    "name": "Delight",
    "style": "Foedre Aged Grisette",
    "abv": "3.1"
  },
  {
    "id": "105",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Granite",
    "name": "Peculiar",
    "style": "Old Style Strong English Ale",
    "abv": "5.6"
  },
  {
    "id": "106",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Granite",
    "name": "Hopping Mad",
    "style": "APA",
    "abv": "6"
  },
  {
    "id": "107",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "North",
    "name": "Headlnine Milk Stout",
    "style": "Sweet Stout",
    "abv": "5.5"
  },
  {
    "id": "108",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "North",
    "name": "Cool Melon",
    "style": "Watermelon Kolsch",
    "abv": "4.5"
  },
  {
    "id": "109",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Propeller",
    "name": "Brett Porter",
    "style": "Barrel Aged Brett Porter",
    "abv": "6.4"
  },
  {
    "id": "110",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Propeller",
    "name": "ESB w. Coffee",
    "style": "English Ale",
    "abv": "5"
  },
  {
    "id": "111",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Stillwell",
    "name": "Prince Kellerpils (Dry-Hopped)",
    "style": "Kellerbier",
    "abv": "4.5"
  },
  {
    "id": "112",
    "session": "S3",
    "region": "Nova Scotia",
    "brewery": "Stillwell",
    "name": "Prince Kellerpils",
    "style": "Kellerbier",
    "abv": "4.5"
  },
  {
    "id": "113",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Stillwell",
    "name": "Gosh",
    "style": "Blend Of Barrel-Fermented Saisons Dry-Hopped w. Mosaic",
    "abv": "5.4"
  },
  {
    "id": "114",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Tatamagouche",
    "name": "Kellerbier",
    "style": "Kellerbier",
    "abv": "4.8"
  },
  {
    "id": "115",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "Tatamagouche",
    "name": "English Mild",
    "style": "English Dark Mild",
    "abv": "3.8"
  },
  {
    "id": "116",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "The Church",
    "name": "Til Death Do Us Tart",
    "style": "Framboise",
    "abv": "4.9"
  },
  {
    "id": "117",
    "session": "S1",
    "region": "Nova Scotia",
    "brewery": "The Church",
    "name": "Saltwater Joys",
    "style": "Gose",
    "abv": "4.4"
  },
  {
    "id": "118",
    "session": "S1",
    "region": "Québec",
    "brewery": "Benelux",
    "name": "Buzz",
    "style": "American IPA",
    "abv": "6.7"
  },
  {
    "id": "119",
    "session": "S1",
    "region": "Québec",
    "brewery": "Benelux",
    "name": "Grande Armada",
    "style": "Bourbon Barrel Double American Brown Ale",
    "abv": "10.1"
  },
  {
    "id": "120",
    "session": "S1",
    "region": "Québec",
    "brewery": "Benelux",
    "name": "Nébulose",
    "style": "Mixed Fermentation Saison",
    "abv": "6.6"
  },
  {
    "id": "121",
    "session": "S1",
    "region": "Québec",
    "brewery": "Benelux",
    "name": "Old Ale",
    "style": "Old Ale",
    "abv": "8.5"
  },
  {
    "id": "122",
    "session": "S3",
    "region": "Québec",
    "brewery": "Dieu Du Ciel",
    "name": "Péché Mortel Xtra Xtra Coffee",
    "style": "Imperial Coffee Stout w. Extra Extra Coffee",
    "abv": "9.5"
  },
  {
    "id": "123",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dieu Du Ciel!",
    "name": "Péché Mortel Xtra Coffee",
    "style": "Imperial Coffee Stout w. Extra Coffee",
    "abv": "9.5"
  },
  {
    "id": "124",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dieu Du Ciel!",
    "name": "Corne Du Diable",
    "style": "Centennial & Amarillo Hops IPA",
    "abv": "5.9"
  },
  {
    "id": "125",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dieu Du Ciel!",
    "name": "Chemin De Croix",
    "style": "Old-Style India Porter",
    "abv": "5.7"
  },
  {
    "id": "126",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dieu Du Ciel!",
    "name": "Disco Tango",
    "style": "Tangerine IPA",
    "abv": "5.7"
  },
  {
    "id": "127",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dieu Du Ciel!",
    "name": "Sul'Pouce Vers Une Autre Galaxie",
    "style": "Galaxy Hops IPA",
    "abv": "5.9"
  },
  {
    "id": "128",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dunham",
    "name": "Pale Ale Américaine",
    "style": "APA",
    "abv": "5.5"
  },
  {
    "id": "129",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dunham",
    "name": "Citra De Table",
    "style": "Table Beer",
    "abv": "4.3"
  },
  {
    "id": "130",
    "session": "S1",
    "region": "Québec",
    "brewery": "Dunham",
    "name": "Stout Impériale Russe",
    "style": "Russian Imperial Stout",
    "abv": "9.5"
  },
  {
    "id": "131",
    "session": "S3",
    "region": "Québec",
    "brewery": "Dunham",
    "name": "Stout Impériale Russe",
    "style": "Russian Imperial Stout",
    "abv": "9.5"
  },
  {
    "id": "132",
    "session": "S1",
    "region": "Québec",
    "brewery": "Farnham",
    "name": "Farnham-Ator",
    "style": "Bourbon Barrel Aged Doppelbock",
    "abv": "8.2"
  },
  {
    "id": "133",
    "session": "S1",
    "region": "Québec",
    "brewery": "Farnham",
    "name": "Hazy Camper",
    "style": "NEIPA",
    "abv": "5.3"
  },
  {
    "id": "134",
    "session": "S1",
    "region": "Québec",
    "brewery": "Hopfenstark",
    "name": "Postcolonial IPA",
    "style": "American IPA",
    "abv": "6.5"
  },
  {
    "id": "135",
    "session": "S1",
    "region": "Québec",
    "brewery": "Isle De Garde",
    "name": "Lagerbier",
    "style": "Lagerbier",
    "abv": "4.8"
  },
  {
    "id": "136",
    "session": "S1",
    "region": "Québec",
    "brewery": "Isle De Garde",
    "name": "Brown Ale Anglaise",
    "style": "English Brown Ale",
    "abv": "4.8"
  },
  {
    "id": "137",
    "session": "S3",
    "region": "Québec",
    "brewery": "Isle De Garde",
    "name": "Cette Session Sensationelle",
    "style": "Session American IPA",
    "abv": "4.1"
  },
  {
    "id": "138",
    "session": "S3",
    "region": "Québec",
    "brewery": "Isle De Garde",
    "name": "C'est Une IPA; Elle Est Américaine",
    "style": "American IPA",
    "abv": "5.6"
  },
  {
    "id": "139",
    "session": "S1",
    "region": "Québec",
    "brewery": "La Souche",
    "name": "",
    "style": "",
    "abv": ""
  },
  {
    "id": "140",
    "session": "S1",
    "region": "Québec",
    "brewery": "La Souche",
    "name": "",
    "style": "",
    "abv": ""
  },
  {
    "id": "141",
    "session": "S1",
    "region": "Québec",
    "brewery": "Le Trêfle Noir",
    "name": "El Sicimo With Mangos. Peaches And Strawberries",
    "style": "Pale Ale",
    "abv": "6"
  },
  {
    "id": "142",
    "session": "S1",
    "region": "Québec",
    "brewery": "Le Trêfle Noir",
    "name": "Gosebuster",
    "style": "Gose",
    "abv": "3"
  },
  {
    "id": "143",
    "session": "S1",
    "region": "Québec",
    "brewery": "Les Trois Mousquetaires",
    "name": "Porter Baltique Special Edition With Yirgacheffe Coffee",
    "style": "Barrel Aged Porter Baltique",
    "abv": "10.5"
  },
  {
    "id": "144",
    "session": "S3",
    "region": "Québec",
    "brewery": "Les Trois Mousquetaires",
    "name": "Dixième Extra Cherry",
    "style": "Imperial Sour Black Kriek",
    "abv": "10"
  },
  {
    "id": "145",
    "session": "S1",
    "region": "Québec",
    "brewery": "Les Trois Mousquetaires",
    "name": "Schwartzbier Hazelnut + Coconut",
    "style": "Schwartzbier",
    "abv": "5"
  },
  {
    "id": "146",
    "session": "S1",
    "region": "Québec",
    "brewery": "Les Trois Mousquetaires",
    "name": "Barleywine Americain",
    "style": "American Barleywine",
    "abv": "11"
  },
  {
    "id": "147",
    "session": "S1",
    "region": "Québec",
    "brewery": "Riverbend",
    "name": "Bitter",
    "style": "Bitter",
    "abv": "3.8"
  },
  {
    "id": "148",
    "session": "S1",
    "region": "Québec",
    "brewery": "Riverbend",
    "name": "Sour Cherry Berliner Weisse w. Blackcurrant",
    "style": "Fruit Berliner Weisse",
    "abv": "5.6"
  },
  {
    "id": "149",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Barn Hammer",
    "name": "The Wurst",
    "style": "Sauerkraut & Mustard Lager",
    "abv": "5"
  },
  {
    "id": "150",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Kilter",
    "name": "Sicario",
    "style": "Mexican Stout",
    "abv": "9"
  },
  {
    "id": "151",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Kilter",
    "name": "Isles Of Fortune",
    "style": "Triple Dry-Hopped IPA",
    "abv": "7.2"
  },
  {
    "id": "152",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Low Life",
    "name": "Kiss Kiss",
    "style": "Tart Brett Saison",
    "abv": "6.5"
  },
  {
    "id": "153",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Sookram's",
    "name": "Dogme 95",
    "style": "Wet Local Hop ESB",
    "abv": "5.5"
  },
  {
    "id": "154",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Sookram's",
    "name": "Dogme 95",
    "style": "Wet Local Hop ESB",
    "abv": "5.5"
  },
  {
    "id": "155",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Trans Canada",
    "name": "Haskap Solera",
    "style": "Foeder Aged Farmhouse Saison w. Wild Manitoba Haskap Berries",
    "abv": "7.2"
  },
  {
    "id": "156",
    "session": "S1",
    "region": "Manitoba",
    "brewery": "Trans Canada",
    "name": "Oud",
    "style": "Foeder Aged Sour Brown Ale w. Manitoba Sour Cherries",
    "abv": "6.5"
  },
  {
    "id": "157",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Blind Enthusiasm",
    "name": "Do you even cask, Bro?",
	  "style": "English Chocolate Brown Ale",
	  "abv":"5.6"
  },
{
    "id": "158",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Blind Enthusiasm",
    "name": "Zesty Zus",
    "style": "German Wheat Ale",
    "abv": "4"
  },
  {
    "id": "159",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Blindman",
    "name": "New England-Style Pale Ale w. Galaxy, Ella & Azacca",
    "style": "Hazy Pale Ale",
    "abv": "5.5"
  },
  {
    "id": "160",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Blindman",
    "name": "Pierre Foeder-Aged Saison w. Huell Melon",
    "style": "Mixed Ferment Saison",
    "abv": "5.8"
  },
  {
    "id": "161",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Odd Company",
    "name": "Rye Sour",
    "style": "Sour",
    "abv": "5.8"
  },
  {
    "id": "162",
    "session": "S1",
    "region": "Alberta",
    "brewery": "Odd Company",
    "name": "Raw Pale Ale",
    "style": "Pale Ale",
    "abv": "4.7"
  },
  {
    "id": "163",
    "session": "S1",
    "region": "Alberta",
    "brewery": "The Dandy",
    "name": "One Night in Bangkok",
    "style": "Thai Inspired IPA",
    "abv": "7.5"
  },
  {
    "id": "164",
    "session": "S1",
    "region": "Alberta",
    "brewery": "The Dandy",
    "name": "She's My Cherry Pie",
    "style": "Cherry Sour Ale",
    "abv": "6"
  },
  {
    "id": "165",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Backcountry",
    "name": "Your Mom Goes To College",
    "style": "Boysenberry Pie Sour",
    "abv": "5.5"
  },
  {
    "id": "166",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Boombox",
    "name": "Secret Galaxies",
    "style": "IPA",
    "abv": "7"
  },
  {
    "id": "167",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Dageraad",
    "name": "Velour Toboggan - Raspberry",
    "style": "Dark Fruit Beer",
    "abv": "5.5"
  },
  {
    "id": "168",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Dageraad",
    "name": "Rainshine - Grapfruit",
    "style": "Hoppy Blonde Ale",
    "abv": "6.5"
  },
  {
    "id": "169",
    "session": "S3",
    "region": "British Columbia",
    "brewery": "Four Winds",
    "name": "Pomona Stone Fruit Sour",
    "style": "Barrel Aged Fruited Sour",
    "abv": "5.5"
  },
  {
    "id": "170",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Four Winds",
    "name": "Dry-Hopped Keller Festbier",
    "style": "Keller-Festbier",
    "abv": "5.9"
  },
  {
    "id": "171",
    "session": "S3",
    "region": "British Columbia",
    "brewery": "Luppolo",
    "name": "Albiccochina 2019",
    "style": "Barrel Aged Mixed Fermentation Sour w. Apricots",
    "abv": "7"
  },
  {
    "id": "172",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Luppolo",
    "name": "Macaroon Extra Stout",
    "style": "Adjunct Extra Stout",
    "abv": "7.5"
  },
  {
    "id": "173",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Steel & Oak",
    "name": "Rauchbier",
    "style": "Smoked Lager",
    "abv": "4.8"
  },
  {
    "id": "174",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Superflux",
    "name": "Craft Beer Is Dead",
    "style": "American IPA",
    "abv": "6.5"
  },
  {
    "id": "175",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Superflux",
    "name": "Pretty Much Yeah",
    "style": "American IPA",
    "abv": "6.5"
  },
  {
    "id": "176",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Twin Sails",
    "name": "Cookie Jar",
    "style": "Oatmeal Fudge Stout w. Cocoa, Cinnamon & Honey",
    "abv": "6"
  },
  {
    "id": "177",
    "session": "S3",
    "region": "British Columbia",
    "brewery": "Twin Sails",
    "name": "Cookie Jar",
    "style": "Oatmeal Fudge Stout w. Vanilla & Coconut",
    "abv": "6"
  },
  {
    "id": "178",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Yellow Dog",
    "name": "Summer Harvest Pale Ale",
    "style": "Pale Ale",
    "abv": "5.2"
  },
  {
    "id": "179",
    "session": "S1",
    "region": "British Columbia",
    "brewery": "Yellow Dog",
    "name": "Tropical Delight IPA",
    "style": "IPA",
    "abv": "7"
  },
  {
    "id": "180",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "John Walter & Joe Bond (Sundown)",
    "name": "Bitter Boy Dark Ale",
    "style": "American Brown Ale",
    "abv": "5.5"
  },
  {
    "id": "181",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "David Kline x Greg Wheeler (Bishopstoke)",
    "name": "Rover's Reward ESB",
    "style": "ESB",
    "abv": "5.6"
  },
  {
    "id": "182",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Eric Cousineau x Matt Walton",
    "name": "Maynard's Curse",
    "style": "Strong Ale w. Activated Charcoal & Wine Gums",
    "abv": "7.1"
  },
  {
    "id": "183",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Matt Ballky x Guillaume Couture-Levesque",
    "name": "Casc Me Stoutside",
    "style": "Double Espresso Stout w. Cascara Coffee Cherries",
    "abv": "7"
  },
  {
    "id": "184",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Sam Griffiths x Kieth Caines",
    "name": "Wee Ain't Heavy",
    "style": "Scottish Export",
    "abv": "5.8"
  },
  {
    "id": "185",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "David Chang-Sang x Colin Green",
    "name": "Brazilla",
    "style": "American Wheat w. Lime Zest, Cachaca-Soaked Oak & Lactose",
    "abv": "5.9"
  },
  {
    "id": "186",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Evan Bonsell x Nik Cole",
    "name": "Backseat Vintage",
    "style": "Olde Ale",
    "abv": "6.5"
  },
  {
    "id": "187",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Nick Hodowsky x Bear Alberico",
    "name": "High Tea with Archie",
    "style": "Strong Bitter w. Tea",
    "abv": "5.4"
  },
  {
    "id": "188",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Luke Van Oort x Jim Bruce",
    "name": "Dark and Confused",
    "style": "Sour Dark Mild",
    "abv": "3.9"
  },
  {
    "id": "189",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Toronto Brewing - Danny Pimenta and Mick Capiak",
    "name": "For Your Health, Dingus! (2.0",
	  "style": "Dry-Hopped Kettle Sour w. Kombucha",
	  "abv": "5"
  },
  {
    "id": "190",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Durham Homebrewers Club",
    "name": "Just the TIPA",
    "style": "New England Triple IPA",
    "abv": "10.2"
  },
  {
    "id": "191",
    "session": "S1",
    "region": "Homebrew",
    "brewery": "Maple City Brewers Alliance",
    "name": "I'm your Ch-Ch-Ch-Cherry Bomb!",
    "style": "Oatmeal Stout w. Cherries, Vanilla, Cacao Nibs & Lactose Fermented w. Arset Kveik",
    "abv": "6.5"
  },
  {
    "id": "192",
    "session": "S1",
    "region": "Cider",
    "brewery": "101 Cider House",
    "name": "If You Can't Do The Lime Don't Do The Crime",
    "style": "Cider",
    "abv": "6.9"
  },
  {
    "id": "193",
    "session": "S1",
    "region": "Cider",
    "brewery": "101 Cider House",
    "name": "Frosted Tips",
    "style": "Cider",
    "abv": "6.9"
  },
  {
    "id": "194",
    "session": "S3",
    "region": "Cider",
    "brewery": "101 Cider House",
    "name": "The Floor Is Guava",
    "style": "Cider",
    "abv": "6.9"
  },
  {
    "id": "195",
    "session": "S3",
    "region": "Cider",
    "brewery": "101 Cider House",
    "name": "Forest Mojito",
    "style": "CIder",
    "abv": "6.9"
  },
  {
    "id": "196",
    "session": "S1",
    "region": "Cider",
    "brewery": "Brunswick Bierworks X Stock & Row",
    "name": "Dry Hopped Cider",
    "style": "Dry Hopped Cider",
    "abv": "5"
  },
  {
    "id": "197",
    "session": "S1",
    "region": "Cider",
    "brewery": "Heartwood",
    "name": "Feminine Tea-Se",
    "style": "Feminine Tea-Se",
    "abv": "6.8"
  },
  {
    "id": "198",
    "session": "S1",
    "region": "Cider",
    "brewery": "Ironwood",
    "name": "Domo Habricoto",
    "style": "Fruited Sour",
    "abv": "6"
  },
  {
    "id": "199",
    "session": "S1",
    "region": "Cider",
    "brewery": "Ironwood",
    "name": "Cranberry Nightcap",
    "style": "Cider",
    "abv": "7.5"
  },
  {
    "id": "200",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Rauscher",
    "style": "Bartlett Pear",
    "abv": "3"
  },
  {
    "id": "201",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Rauscher",
    "style": "Cider",
    "abv": "3"
  },
  {
    "id": "202",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Piquette",
    "style": "Muscat",
    "abv": "4.8"
  },
  {
    "id": "203",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Piquette",
    "style": "Marechal Foch",
    "abv": "4.8"
  },
  {
    "id": "204",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Mirabelle",
    "style": "Cider w. Strawberry, Lemon Verbena",
    "abv": "6.5"
  },
  {
    "id": "205",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Cursive",
    "style": "Cider & Perry w. Blueberry & Marechal Foch",
    "abv": "6.5"
  },
  {
    "id": "206",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Estrella",
    "style": "Spanish Inspired Sidra",
    "abv": "6.5"
  },
  {
    "id": "207",
    "session": "S1",
    "region": "Cider",
    "brewery": "Revel",
    "name": "Emergent Property",
    "style": "Tequila Barrel Aged Cider w. Lemon Verbena & Sea Salt",
    "abv": "7"
  },
  {
    "id": "208",
    "session": "S1",
    "region": "Cider",
    "brewery": "Ibi Wines (Revel)",
    "name": "Federweisser",
    "style": "Marechal Foch",
    "abv": "6"
  },
  {
    "id": "209",
    "session": "S1",
    "region": "Cider",
    "brewery": "Ibi Wines (Revel)",
    "name": "Federweisser",
    "style": "Seyval Blanc",
    "abv": "6"
  },
  {
    "id": "210",
    "session": "S1",
    "region": "Cider",
    "brewery": "Reverend Nat's",
    "name": "Shoot The Glass",
    "style": "Semi-Sweet Hopped Cider",
    "abv": "6.8"
  },
  {
    "id": "211",
    "session": "S1",
    "region": "Cider",
    "brewery": "Reverend Nat's",
    "name": "841 The Passion",
    "style": "Super-Sour Passionfruit Cider",
    "abv": "7.2"
  },
  {
    "id": "212",
    "session": "S1",
    "region": "Cider",
    "brewery": "Reverend Nat's",
    "name": "Fresh Hop Hopricot",
    "style": "Fresh Hopped Cider",
    "abv": "6.7"
  },
  {
    "id": "213",
    "session": "S1",
    "region": "Cider",
    "brewery": "Reverend Nat's",
    "name": "Fresh Hopped Hallelujah Hopricot",
    "style": "Fresh Hopped Cider",
    "abv": "6.7"
  },
  {
    "id": "214",
    "session": "S1",
    "region": "Cider",
    "brewery": "Steel Town",
    "name": "The Northmen",
    "style": "Cider",
    "abv": "6.5"
  },
  {
    "id": "215",
    "session": "S1",
    "region": "Cider",
    "brewery": "Steel Town",
    "name": "Vay Kay",
    "style": "Cider",
    "abv": "5.5"
  },
  {
    "id": "216",
    "session": "S1",
    "region": "Cider",
    "brewery": "Thornbury",
    "name": "Thornbury Star Anise Cranberry Cider",
    "style": "Star Anise Cranberry Cider",
    "abv": "5.3"
  },
  {
    "id": "217",
    "session": "S1",
    "region": "Cider",
    "brewery": "Thornbury",
    "name": "Thornbury Raspberry Yuzu Cider",
    "style": "Raspberry Yuzu Cider",
    "abv": "5.2"
  },
  {
    "id": "218",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Cidre Blanc",
    "style": "30% Sauvignon Blanc + 70% Apple",
    "abv": "8.2"
  },
  {
    "id": "219",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Heritage Gold",
    "style": "Wine Barrel-Aged Heritage Apple",
    "abv": "7.5"
  },
  {
    "id": "220",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Siberian Pineapple",
    "style": "Sea Buckthorn Cider",
    "abv": "5.5"
  },
  {
    "id": "221",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Malus Lupulus",
    "style": "Dry-hopped Apple Cider w. Cascade Hops",
    "abv": "6.9"
  },
  {
    "id": "222",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Gold Dust",
    "style": "Single Variety Golden Russet Apple",
    "abv": "9.5"
  },
  {
    "id": "223",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Blackberry JuiceBox",
    "style": "Wild Ontario Blueberry Cider",
    "abv": "5.5"
  },
  {
    "id": "224",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Heritage Funk",
    "style": "Wild Fermented & Barrel Aged",
    "abv": "7.5"
  },
  {
    "id": "225",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Autumn",
    "style": "Classic Heritage Apple Cider",
    "abv": "7.5"
  },
  {
    "id": "226",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Pinot Peardhi",
    "style": "Ontario Pinot Noir + Pear Cider",
    "abv": "7.9"
  },
  {
    "id": "227",
    "session": "S1",
    "region": "Cider",
    "brewery": "West Avenue",
    "name": "Cherry Funk",
    "style": "Wild Farmhouse Cider w. Sour Cherries",
    "abv": "6.9"
  },
  {
    "id": "228",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Amsterdam",
    "name": "El Jaguar",
    "style": "Barrel Aged Imperial Stout",
    "abv": "11.9"
  },
  {
    "id": "229",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Amsterdam",
    "name": "Fracture",
    "style": "Imperial India Pale Ale",
    "abv": "9.1"
  },
  {
    "id": "230",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Bar Hop",
    "name": "Chupacabra Party!",
    "style": "Stout w. Coffee, Vanilla Beans & Cinnamon",
    "abv": "5.9"
  },
  {
    "id": "231",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Bar Hop",
    "name": "Conventionally Attractive",
    "style": "Blend of Barrel-Aged Sour Ales w. Raspberries & Strawberries",
    "abv": "6.3"
  },
  {
    "id": "232",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Barncat",
    "name": "Detox",
    "style": "Super Food Smoothie IPA",
    "abv": "6.5"
  },
  {
    "id": "233",
    "session": "S3",
    "region": "Ontario",
    "brewery": "Barncat",
    "name": "Cafe A Handful Of Darkness",
    "style": "Strong Porter w. Coffee & Vanilla",
    "abv": "7.2"
  },
  {
    "id": "234",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Beau's All Natural",
    "name": "DAVIDsTEA London Fog",
    "style": "Earl Grey Latte Ale",
    "abv": "5.3"
  },
  {
    "id": "235",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Beau's All Natural X Sam James Coffee",
    "name": "Coffee Time IPA",
    "style": "IPA w. Coffee",
    "abv": "6"
  },
  {
    "id": "236",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Beerlab!",
    "name": "Hall Pass",
    "style": "IPA",
    "abv": "6"
  },
  {
    "id": "237",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Beerlab!",
    "name": "Imaginary Force",
    "style": "Robust Porter",
    "abv": "5.5"
  },
  {
    "id": "238",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Bellwoods",
    "name": "Mega Coffee Infused Imperial Stout",
    "style": "Imperial Stout",
    "abv": "10"
  },
  {
    "id": "239",
    "session": "S3",
    "region": "Ontario",
    "brewery": "Bellwoods",
    "name": "Mint Chocolate Chip Imperial Stout",
    "style": "Imperial Stout w. Mint & Chocolate",
    "abv": "10"
  },
  {
    "id": "240",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Black Lab",
    "name": "Enigma DDH IPA",
    "style": "DDH IPA",
    "abv": "6.5"
  },
  {
    "id": "241",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Black Lab",
    "name": "Billy's Blueberry",
    "style": "Sour Ale w. Blueberry & Hibiscus",
    "abv": "4"
  },
  {
    "id": "242",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Black Oak",
    "name": "Old Regular",
    "style": "English Dark Mild",
    "abv": "3"
  },
  {
    "id": "243",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Black Oak",
    "name": "AP Dark Star Galaxy Hopper",
    "style": "American Porter",
    "abv": "6.3"
  },
  {
    "id": "244",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Blood Brothers",
    "name": "Mara",
    "style": "Imperial Stout w. Salted Peanut Butter",
    "abv": "9.1"
  },
  {
    "id": "245",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Blood Brothers",
    "name": "Fall Of Thebes",
    "style": "Barrel-Aged Wild Ale w. Cherry",
    "abv": "7.5"
  },
  {
    "id": "246",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Brunswick Bierworks X Tooth & Claw",
    "name": "Wet Hopped Hopfenweizen",
    "style": "Wet Hopped Hopfenweizen",
    "abv": "5.5"
  },
  {
    "id": "247",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Burdock",
    "name": "Grape Stout",
    "style": "Fruited Stout",
    "abv": "4"
  },
  {
    "id": "248",
    "session": "S3",
    "region": "Ontario",
    "brewery": "Burdock",
    "name": "Grape & Lemon Zesté",
    "style": "Fruited Sour Beer",
    "abv": "4.5"
  },
  {
    "id": "249",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Cameron's",
    "name": "Sasion Of Fun",
    "style": "Dry Hopped Sasion",
    "abv": "7"
  },
  {
    "id": "250",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Cameron's",
    "name": "Double Your Money",
    "style": "Double IPA",
    "abv": "8"
  },
  {
    "id": "251",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Cheshire Valley",
    "name": "Mildly Amusing",
    "style": "Mild",
    "abv": "3.4"
  },
  {
    "id": "252",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Cowbell",
    "name": "Thunder & Lightening",
    "style": "Blonde Ale w. Ginger & Lemongrass",
    "abv": "5.3"
  },
  {
    "id": "253",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Cowbell",
    "name": "Fantastic Voyage",
    "style": "Belgian Quad w. Cocoa Nibs, Coffee Beans, Nutmeg & Star Anise",
    "abv": "12"
  },
  {
    "id": "254",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Dominion City",
    "name": "Lost Train",
    "style": "Oatmeal Stout",
    "abv": "5.5"
  },
  {
    "id": "255",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Dominion City",
    "name": "Lost Train",
    "style": "Oatmeal Stout w. Cocoa Nibs, Honey, Lactose & Toasted Hazelnuts",
    "abv": "6"
  },
  {
    "id": "256",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Eastbound",
    "name": "Forest Explorer",
    "style": "IPA",
    "abv": "6.5"
  },
  {
    "id": "257",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Eastbound",
    "name": "Backpacker's Peelin' Good",
    "style": "Fruited Blonde Ale",
    "abv": "5.5"
  },
  {
    "id": "258",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Elora",
    "name": "Elora Australis",
    "style": "IPA",
    "abv": "6.1"
  },
  {
    "id": "259",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Elora",
    "name": "Lodestar w. Elderberry",
    "style": "Fruited Sour",
    "abv": "5.1"
  },
  {
    "id": "260",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Fairweather",
    "name": "Pineapple Sour w. Vanilla & Naga Viper Chillies",
    "style": "Pineapple Sour w. Vanilla & Naga Viper Chillies",
    "abv": "6.5"
  },
  {
    "id": "261",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Fairweather",
    "name": "Dry-Hopped Barrel Aged Golden Ale",
    "style": "Dry-Hopped Barrel Aged Golden Ale",
    "abv": "5.5"
  },
  {
    "id": "262",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Flying Monkeys",
    "name": "Killer Cupcake Panda",
    "style": "Double IPA w. Pandan & Coffee",
    "abv": "8.3"
  },
  {
    "id": "263",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Flying Monkeys",
    "name": "Divinity",
    "style": "Barrel Aged Solera Barleywine",
    "abv": "15.6"
  },
  {
    "id": "264",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Folly",
    "name": "Brûlée",
    "style": "Keptinis",
    "abv": "9"
  },
  {
    "id": "265",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Godspeed",
    "name": "Double Ochame",
    "style": "Imperial Green Tea IPA w. Mosaic Hops",
    "abv": "7.7"
  },
  {
    "id": "266",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Godspeed",
    "name": "Oi !",
    "style": "Extra Special Bitter",
    "abv": "4.8"
  },
  {
    "id": "267",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Godspeed",
    "name": "Otsukaresama",
    "style": "Dortmunder Lagerbier",
    "abv": "4.8"
  },
  {
    "id": "268",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Godspeed",
    "name": "Godspeed Style Unfiltered Helles Lagerbier",
    "style": "Franconian Helles Lager",
    "abv": "4.5"
  },
  {
    "id": "269",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Granite",
    "name": "Half Blooded Eire With Oak",
    "style": "Irish Mild",
    "abv": "5.2"
  },
  {
    "id": "270",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Granite",
    "name": "Pumpkin Jack Flash",
    "style": "Pumpkin Ae",
    "abv": "6.9"
  },
  {
    "id": "271",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Great Lakes",
    "name": "Montgomery Mild",
    "style": "Mild",
    "abv": "3.5"
  },
  {
    "id": "272",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Great Lakes",
    "name": "Devils Pale Ale",
    "style": "Pale Ale",
    "abv": "6"
  },
  {
    "id": "273",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Halcyon",
    "name": "Dark Designs",
    "style": "Wine Barrel Aged Stout w. Grapes",
    "abv": "12"
  },
    {
    "id": "274",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Halo",
    "name": "Day Star++",
    "style": "Tart Brett Saison w. Apricot & Lemon, Refermented on Apricots",
    "abv": "6"
  },
  {
    "id": "275",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Halo",
    "name": "Ten Eighty++",
    "style": "Sour Imperial Saison w. Blackberry, Cherry & Lemon",
    "abv": "10"
  },
  {
    "id": "276",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Henderson",
    "name": "PB&J",
    "style": "Stout",
    "abv": "6.5"
  },
  {
    "id": "277",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Henderson",
    "name": "Viking's Blood",
    "style": "Nordic Lager",
    "abv": "5.5"
  },
  {
    "id": "278",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Indie Alehouse",
    "name": "Shadow Chaser",
    "style": "IPA",
    "abv": "5.5"
  },
  {
    "id": "279",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Indie Alehouse",
    "name": "Breakfast Porter",
    "style": "English Porter",
    "abv": "7.2"
  },
  {
    "id": "280",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Junction",
    "name": "Bountiful Black Lager",
    "style": "Black Lager",
    "abv": "5.5"
  },
  {
    "id": "281",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Junction\/SMX (St Mary Axe)",
    "name": "Ursula's Tropical Crush",
    "style": "Session IPA w. Fruit Additions",
    "abv": "4.5"
  },
    {
    "id": "282",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Left Field Brewery",
    "name": "Squeeze Play - Blueberry Milkshake",
    "style": "Sour Ale w. Blueberries, Lactose & Vanilla",
    "abv": "4.8"
  },
  {
    "id": "283",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Left Field X Dominion City",
    "name": "1,000 Victories",
    "style": "Ontario IPA",
    "abv": "6.8"
  },
  {
    "id": "284",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Little Beasts",
    "name": "Kraken",
    "style": "Triple IPA",
    "abv": "10"
  },
  {
    "id": "285",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Little Beasts",
    "name": "Freyja",
    "style": "Imperial Saison Aged In Chardonnay Barrels",
    "abv": "9.5"
  },
  {
    "id": "286",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Matron",
    "name": "Yeasayer",
    "style": "Lagerbier",
    "abv": "4.8"
  },
  {
    "id": "287",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Matron",
    "name": "Forthright",
    "style": "Fresh Hop Farmhouse Ale",
    "abv": "4.9"
  },
    {
    "id": "288",
    "session": "S1",
    "region": "Ontario",
    "brewery": "MERIT",
    "name": "Nowhere With Relay Coffee Espresso",
    "style": "Imperial Stout w. Espresso, Vanilla & Honey",
    "abv": "9.6"
  },
  {
    "id": "289",
    "session": "S1",
    "region": "Ontario",
    "brewery": "MERIT",
    "name": "Blueberry Fritter Nowhere",
    "style": "Imperial Stout",
    "abv": "9.6"
  },
  {
    "id": "290",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Muddy York",
    "name": "Cognac Barrel Aged Inkwell Imperial Stout",
    "style": "Imperial Stout",
    "abv": "11.9"
  },
  {
    "id": "291",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Muddy York",
    "name": "Tequila Daisy",
    "style": "Tequila Barrel Aged Sour w. Lime & Vancouver Island Sea Salt",
    "abv": "7"
  },
  {
    "id": "292",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Muskoka",
    "name": "Check This Stout",
    "style": "Imperial Stout",
    "abv": "8.5"
  },
  {
    "id": "293",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Muskoka",
    "name": "Bueller, Bueller?",
	  "style": "English Best Bitter",
	  "abv": "4.2"
  },
  {
    "id": "294",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Niagara Oast House",
    "name": "Green Tomato Saison",
    "style": "Saison",
    "abv": "5"
  },
  {
    "id": "295",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Nickel Brook",
    "name": "Uncertainty Principle 5",
    "style": "Barrel Aged Fruited Sour",
    "abv": "6"
  },
  {
    "id": "296",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Nickel Brook",
    "name": "Headstock",
    "style": "IPA",
    "abv": "7"
  },
  {
    "id": "297",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Omnipollo",
    "name": "Barrel Aged Prodromus",
    "style": "Graham Cracker Chocolate Chunk Caramel Bar Imperial Stout",
    "abv": "10.5"
  },
  {
    "id": "298",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Omnipollo",
    "name": "Agamemnon",
    "style": "Maple Syrup Imperial Stout",
    "abv": "10.5"
  },
  {
    "id": "299",
    "session": "S1",
    "region": "Ontario",
    "brewery": "People's Pint",
    "name": "Blue Harvest",
    "style": "Blueberry Sour w. Spirulina",
    "abv": "5"
  },
  {
    "id": "300",
    "session": "S1",
    "region": "Ontario",
    "brewery": "People's Pint",
    "name": "Saison's Greetings",
    "style": "Gingerbread Saison",
    "abv": "7.8"
  },
  {
    "id": "301",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Peoples Pint X Iron Rings",
    "name": "Scottish Tawny",
    "style": "Scottish Ale w. Port",
    "abv": "5"
  },
  {
    "id": "302",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Rainhard",
    "name": "Armed 'N Galaxy",
    "style": "Dry Hopped Pale Ale",
    "abv": "5.2"
  },
    {
    "id": "303",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Rainhard",
    "name": "Cut And Run",
    "style": "Foeder Aged Sour w. Blackberry, Lemon & Vanilla",
    "abv": "7"
  },
  {
    "id": "304",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Redline",
    "name": "Leather Interior",
    "style": "Brown Ale w. Vanilla & Almond",
    "abv": "5.4"
  },
  {
    "id": "305",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Redline",
    "name": "Rainbow In The Dark",
    "style": "Rye IPA",
    "abv": "6.6"
  },
  {
    "id": "306",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Rorschach",
    "name": "God Complex",
    "style": "Super Saison w. Strawberry, Kiwi & Brett",
    "abv": "9"
  },
  {
    "id": "307",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Rorschach",
    "name": "Blue Hurricane Hedonism",
    "style": "Sorbet Sour IPA w. Pineapple & Blue Berry Blast",
    "abv": "6.9"
  },
  {
    "id": "308",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Rouge River",
    "name": "One Finger Snap",
    "style": "Hazy IPA w. Strata Hops & Nectarines",
    "abv": "7.2"
  },
  {
    "id": "309",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Sawdust City",
    "name": "You Salty Dog",
    "style": "Beet Gose",
    "abv": "4.5"
  },
  {
    "id": "310",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Sawdust City",
    "name": "Roadside Attraction",
    "style": "Pale Ale",
    "abv": "4.5"
  },
  {
    "id": "311",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Shacklands",
    "name": "Tripel Dry Hopped w. Citra",
    "style": "Tripel",
    "abv": "7.9"
  },
  {
    "id": "312",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Shacklands",
    "name": "Fuzzier Peach",
    "style": "Brett IPA",
    "abv": "5.7"
  },
  {
    "id": "313",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Short Finger",
    "name": "MAUS",
    "style": "Maus Melon Gose",
    "abv": "4.6"
  },
  {
    "id": "314",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Short Finger",
    "name": "N.E.S.",
    "style": "New England Sour w. Plums",
    "abv": "5.2"
  },
  {
    "id": "315",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Sonnen Hill",
    "name": "Whiff",
    "style": "Pale Ale",
    "abv": "4.5"
  },
  {
    "id": "316",
    "session": "S3",
    "region": "Ontario",
    "brewery": "Sonnen Hill",
    "name": "Three New Grains",
    "style": "Bitter",
    "abv": "3.8"
  },
  {
    "id": "317",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Stone City Ales",
    "name": "Ships In The Night",
    "style": "Stout",
    "abv": "5.6"
  },
  {
    "id": "318",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Stone City Ales",
    "name": "Distant Origin IPA",
    "style": "Dry Hop IPA",
    "abv": "6"
  },
  {
    "id": "319",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Storm Stayed",
    "name": "Spice Up Your Life",
    "style": "Pumpkin Spice Latte Stout",
    "abv": "7.2"
  },
  {
    "id": "320",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Storm Stayed",
    "name": "Coffee Break",
    "style": "Coffee Blonde Ale",
    "abv": "4.6"
  },
  {
    "id": "321",
    "session": "S1",
    "region": "Ontario",
    "brewery": "The Exchange",
    "name": "Nightmare Before Christmas",
    "style": "Special Belgian Ale",
    "abv": "10"
  },
  {
    "id": "322",
    "session": "S1",
    "region": "Ontario",
    "brewery": "The Exchange",
    "name": "Cascadian Brett Ale",
    "style": "American Pale Ale w. Brettanomyces",
    "abv": "4.9"
  },
  {
    "id": "323",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Tooth And Nail",
    "name": "Vierde",
    "style": "Brett Barrel Aged Porter\/Stout Blend",
    "abv": "6.8"
  },
  {
    "id": "324",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Tooth And Nail",
    "name": "Fortitude",
    "style": "Stout",
    "abv": "5.4"
  },
  {
    "id": "325",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Tooth And Nail",
    "name": "Rabble-Rouser",
    "style": "India Pale Ale",
    "abv": "6.8"
  },
  {
    "id": "326",
    "session": "S3",
    "region": "Ontario",
    "brewery": "Tooth And Nail",
    "name": "Fortified",
    "style": "Imperial Stout w. Coffee & Chocolate",
    "abv": "9.5"
  },
  {
    "id": "327",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Town",
    "name": "Ruby's Arms",
    "style": "Stout w. Cardamom",
    "abv": "Coconut & Maple"
  },
  {
    "id": "328",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Town",
    "name": "Cosmic Love w. Vanilla & Lactose",
    "style": "Fruited Sour",
    "abv": "5.1"
  },
  {
    "id": "329",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Wellington",
    "name": "Arkell Best Bitter",
    "style": "English Bitter",
    "abv": "4"
  },
  {
    "id": "330",
    "session": "S1",
    "region": "Ontario",
    "brewery": "Wellington",
    "name": "Duck Dive",
    "style": "IPA w. Blackberry & Chai",
    "abv": "6.9"
  },
  {
    "id": "K1",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Dunham X Collective Arts",
    "name": "Guanabana",
    "style": "Double IPA",
    "abv": "8"
  },
  {
    "id": "K2",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Dieu Du Ciel!",
    "name": "Solstice D'été Aux Framboises",
    "style": "Sour Wheat w. Raspberries",
    "abv": "6.5"
  },
  {
    "id": "K3",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Oxbow",
    "name": "Moon Juice",
    "style": "Stainless-Aged Grisette w. Grape Juice",
    "abv": "5.5"
  },
  {
    "id": "K4",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Oxbow",
    "name": "Uvalore",
    "style": "Blended Farmhouse Ale w. Leon Millot Grapes",
    "abv": "7.5"
  },
  {
    "id": "K5",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Stillwell",
    "name": "Rieslinger",
    "style": "Farmhouse Ale w. Riesling Skins",
    "abv": "5.8"
  },
  {
    "id": "K6",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Stillwell",
    "name": "Stilly Pils",
    "style": "Unfiltered Pilsner",
    "abv": "5"
  },
  {
    "id": "K7",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Lost Nation",
    "name": "LostOberfest",
    "style": "Oktoberfest\/Marzen",
    "abv": "6"
  },
  {
    "id": "K8",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Lost Nation",
    "name": "Lost Galaxy",
    "style": "Session IPA",
    "abv": "5"
  },
  {
    "id": "K9",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Forest & Main",
    "name": "Three Snakes",
    "style": "DIPA",
    "abv": "8"
  },
  {
    "id": "K10",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Forest & Main",
    "name": "Cloud Flower",
    "style": "Saison",
    "abv": "4.5"
  },
  {
    "id": "K11",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Hair of the Dog",
    "name": "Fred",
    "style": "American Strong Ale",
    "abv": "10"
  },
  {
    "id": "K12",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Hair of the Dog",
    "name": "Adam",
    "style": "Old Ale",
    "abv": "10"
  },
  {
    "id": "K13",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cascade",
    "name": "Vlad the Imp Aler '17",
    "style": "Blend Of Quad & Blonde Ales Aged In Barrels w. Orange Peel & Cordiander",
    "abv": "10.3"
  },
  {
    "id": "K14",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cascade",
    "name": "Rainbow Project",
    "style": "Barrel Aged Sour Wheat & Blond Blend w. Citrus & Strawberries",
    "abv": "6.5"
  },
  {
    "id": "K15",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cloudwater",
    "name": "A Fire By The Bines",
    "style": "Imperial IPA",
    "abv": "8.5"
  },
  {
    "id": "K16",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cloudwater",
    "name": "Five Good Lots",
    "style": "Single-Hopped Motueka IPA",
    "abv": "6.5"
  },
  {
    "id": "K17",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cantillon",
    "name": "Carignan",
    "style": "Lambic w. Carignan Grapes",
    "abv": "5"
  },
  {
    "id": "K18",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Cantillon",
    "name": "Cuvée Saint-Gilloise",
    "style": "Dry Hopped Lambic",
    "abv": "5"
  },
  {
    "id": "K19",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Tilquin",
    "name": "Mûre Tilquin",
    "style": "Lambic Blend w. Blackberries",
    "abv": "5.3"
  },
  {
    "id": "K20",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Tilquin",
    "name": "Quetsche Tilquin",
    "style": "Lambic Blend w. Plums",
    "abv": "4.8"
  },
  {
    "id": "K21",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Loverbeer",
    "name": "Griotta",
    "style": "Wild Farmhouse Ale w. Sour Cherries",
    "abv": "5.8"
  },
  {
    "id": "K22",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Loverbeer",
    "name": "BeerBrugna",
    "style": "Wild Sour Aged Fruit Ale w. Plums",
    "abv": "7"
  },
  {
    "id": "K23",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Evil Twin",
    "name": "Three hours? No problem. I'm Sure Your Pizza Is Totally Worth It",
    "style": "American IPA",
    "abv": "6.5"
  },
  {
    "id": "K24",
    "session": "S1",
    "region": "Keep6 Draft",
    "brewery": "Modern Times",
    "name": "Blazing World",
    "style": "Hoppy American Amber",
    "abv": "6.8"
  }
];

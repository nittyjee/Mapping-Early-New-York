/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
  "pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";

  
  
 
/////////////////////////////
//ADD MAP CONTAINER
/////////////////////////////
  
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/nittyjee/cjg705tp9c5xw2rlhsukbq0bs",
	hash: true,
	center: [-74.01229, 40.70545],
	zoom: 16.7,
	pitchWithRotate: false
});




/////////////////////////////
//ADD NAVIGATION CONTROL (ZOOM IN AND OUT)
/////////////////////////////

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");





/////////////////////////////
//NOT SURE WHAT THIS IS
/////////////////////////////

urlHash = window.location.hash;

map.on("load", function() {
	console.log("load");
	var sliderVal = $("#date").val();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

	$("#linkButton").on("click", function() {
		document.location.href = "raster-version.html" + urlHash;
	});
});


map.on("error", function(e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
	});



	
	
	
/////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
/////////////////////////////


function changeDate(unixDate) {
	var year = parseInt(moment.unix(unixDate).format("YYYY"));
	var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

	var sv = $("#year");
	if (year < 1700) {
		sv
		.removeClass("y1700")
		.removeClass("y1800")
		.removeClass("y1850")
		.removeClass("y1900")
		.removeClass("y1950")
		.removeClass("y2000")
		.addClass("y1600");
	}
	if (year >= 1700 && year < 1800) {
		sv
		.removeClass("y1600")
		.removeClass("y1800")
		.removeClass("y1850")
		.removeClass("y1900")
		.removeClass("y1950")
		.removeClass("y2000")
		.addClass("y1700");
	}
	if (year >= 1800 && year < 1850) {
		sv
		.removeClass("y1700")
		.removeClass("y1600")
		.removeClass("y1850")
		.removeClass("y1900")
		.removeClass("y1950")
		.removeClass("y2000")
		.addClass("y1800");
	}
	if (year >= 1850 && year < 1900) {
		sv
		.removeClass("y1700")
		.removeClass("y1800")
		.removeClass("y1600")
		.removeClass("y1900")
		.removeClass("y1950")
		.removeClass("y2000")
		.addClass("y1850");
	}
	if (year >= 1900 && year < 1950) {
		sv
		.removeClass("y1700")
		.removeClass("y1800")
		.removeClass("y1850")
		.removeClass("y1600")
		.removeClass("y1950")
		.removeClass("y2000")
		.addClass("y1900");
	}
	if (year >= 1950 && year < 2000) {
		sv
		.removeClass("y1700")
		.removeClass("y1800")
		.removeClass("y1850")
		.removeClass("y1900")
		.removeClass("y1600")
		.removeClass("y2000")
		.addClass("y1950");
	}
	if (year >= 2000) {
		sv
		.removeClass("y1700")
		.removeClass("y1800")
		.removeClass("y1850")
		.removeClass("y1900")
		.removeClass("y1950")
		.removeClass("y1600")
		.addClass("y2000");
	}


	var yrFilter = ["all", ["<=", "YearStart", year], [">=", "YearEnd", year]];

	var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];
  
  
  
  //LAYERS FOR FILTERING
  
  //NAHC
	map.setFilter("c7_dates-ajsksu", dateFilter);

}//end function changeDate









/////////////////////////////
//LAYERS AND LEGEND
/////////////////////////////


function setLayers() {

	//TOGGLE LAYERS
	var toggleableLayerIds = [
		"buildings",
		"netherlands_buildings-6wkgma",
		"US_Major_Boundaries_Lines-2706lh",
		"US_Minor_Boundaries-1lyzcs",
		"Indian_Subcontinent_Major_Bou-dpiee3",
		"us_major_boundary_labels",
		"Indian_Subcontinent_Major_Bou-5gq491",
		//  "nyc_municipalities_lines-catd44",
		"population"
		];

	//LEGEND?
	var legend = document.getElementById("legend");
	while (legend.hasChildNodes()) {
		legend.removeChild(legend.lastChild);
	}
	
	//TOGGLING
	for (var i = 0; i < toggleableLayerIds.length; i++) {
    //use closure to deal with scoping
		(function() {
			var id = toggleableLayerIds[i];

			//ADD CHECKBOX
			var input = document.createElement("input");
			input.type = "checkbox";
			input.id = id;
			input.checked = true;
			
			//ADD LABEL
			var label = document.createElement("label");
			label.setAttribute("for", id);
			label.textContent = id;

			//CHECKBOX CHANGING (CHECKED VS. UNCHECKED)
			input.addEventListener("change", function(e) {
				map.setLayoutProperty(
					id,
					"visibility",
					e.target.checked ? "visible" : "none"
				);
			});

			//NOTE?
			var layers = document.getElementById("legend");
			layers.appendChild(input);
			layers.appendChild(label);
			layers.appendChild(document.createElement("br"));
		})();
	}

}







/////////////////////////////
//LAYER CHANGING
/////////////////////////////


//BASEMAP SWITCHING
map.on('style.load', function() {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change")
	switchStyle();
	var sliderVal = $("#date").val();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)
	setLayers();
	addLayers(yr, date);
});


//LAYER SWITCHING
function switchStyle() {
	var basemaps = document.getElementById('styleSwitcher');
	var inputs = basemaps.getElementsByTagName('input');
	console.log(inputs)
	console.log(inputs.length)
	function switchLayer(layer) {
		var layerId = layer.target.id;
		if(layerId == 'hidden') {
			// map.removeLayer('buildings')
			// map.removeLayer('netherlands_buildings-6wkgma')
			// map.removeLayer('manhattan_parcels_03-9qwzuf')
			// map.removeLayer('brooklyn_parcels_03-7y3mp4')
			// map.removeLayer('queens_parcels_03-cihsme')
			// map.removeLayer('bronx_parcels_03-4jgu91')
			// map.removeLayer('staten_island_parcels_03-1o8j1i')
			// map.removeLayer('US_Minor_Boundaries-1lyzcs')
			// map.removeLayer('US_Major_Boundaries_Lines-2706lh')
			// map.removeLayer('us_major_boundary_labels')
			// map.removeLayer('Indian_Subcontinent_Major_Bou-dpiee3')
			// map.removeLayer('Indian_Subcontinent_Major_Bou-5gq491')
			map.setStyle('mapbox://styles/nittyjee/cjg705tp9c5xw2rlhsukbq0bs');
		}
		else {
			map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
		}
	}

	for (var i = 0; i < inputs.length; i++) {
	inputs[i].onclick = switchLayer;
	}
}








/////////////////////////////
//MAP LAYERS
/////////////////////////////

function addLayers(yr, date) {



	/////////////////
	//NAHC POINTS MAP
	/////////////////

	map.on('load', function () {
		
		//ADD TAX LOT POINTS
		
		map.addLayer({
			id: "c7_dates-ajsksu",
			type: "circle",
			source: {
			  type: "vector",
			  url: "mapbox://nittyjee.8krf945a"
			},
			"source-layer": "c7_dates",
			paint: {
				
				/*
				'circle-color': {
					type: "categorical",
					property: "LOT2",
					stops: [
						["C7", "#0000ee"]
					],
					default: "#FF0000"
				},
				*/
				
				'circle-color': {
					type: "categorical",
					property: "color",
					stops: [
						["6", "#0000ee"],
						["5", "#097911"],
						["4", "#0000ee"],
						["3", "#097911"],
						["2", "#0000ee"],
						["1", "#097911"]
					],
					default: "#FF0000"
				},

				/* DayStart WITH _key
				16430602 | 6
				16590120 | 3
				16600505 | 4
				16601025 | 2
				16621201 | 1
				16750703 | 0
				*/

				"circle-radius": {
					type: "categorical",
					property: "TAXLOT",
					stops: [
						["C7", 9]
					]
				}
			},
			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


		
		//TAX LOT POPUP
	
		// When a click event occurs on a feature in the places layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		map.on('click', 'c7_dates-ajsksu', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.description;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}
			
			
			new mapboxgl.Popup()
				.setLngLat(coordinates)

				.setHTML(

//<a href="https://www.w3schools.com" target="_blank">Visit W3Schools!</a>

					"<b><h2>Taxlot: C7</h2></b>" +
					"<b>House</b>" +

					"<hr>" +

					//Date Range
					"<b> FROM: </b>" +
					e.features[0].properties.DATE1 +
					"<br>" +
					"<b> TO: </b>" +
					e.features[0].properties.DATE2 +

					e.features[0].properties.Unknown +

					"<hr>" +

					//Good to keep for reference of another way of linking
					//'<a href="' + e.features[0].properties.tax_lots_3 + '" target="_blank">' + e.features[0].properties.tax_lots_3 + '</a>' +
					//"<br>" +

					e.features[0].properties.Next +

					//Owner 1
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_PAR1 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_1 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.TO_ENT1 + ")" +
					"<br>" +
					"<br>" +

					//Owner 2
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_PAR2 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_2 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.TO_ENT2 + ")" +		  

                    "<br>" +
					"<br>" +

					e.features[0].properties.Tax_Event +


					"<br>" +
				  
					//Taxlot Event Type
					'<a href=http://thenittygritty.org' + e.features[0].properties.EVENT1 +
					"<hr>" +

					e.features[0].properties.Previous +

					//"<b> FROM:</b>" +
					"<br>" +
					
					//From 1
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_PAR1 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_1 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.FROM_ENT1 + ")" +
					"<br>" +
					"<br>" +

					
					//From 2
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_PAR2 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_2 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.FROM_ENT2 + ")" +		

					//Previous Taxlot Event
                    e.features[0].properties.Event +

					'<a href=http://thenittygritty.org' + e.features[0].properties.Prev_Event +

					//See All Taxlot Events
					"<br>" +
					"<hr>" +
					"<b> <h3><a href=http://thenittygritty.org/nahc/encyclopedia/taxlot-events>SEE ALL TAXLOT EVENTS</a></h3></b>"






				)
			.addTo(map);
		});
		
		// CHANGE TO CURSOR WHEN HOVERING
		map.on('mouseenter', 'c7_dates-ajsksu', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		map.on('mouseleave', 'c7_dates-ajsksu', function () {
			map.getCanvas().style.cursor = '';
		});
	});
	
	
}
var grant_lots_view_id = null,
    dgrants_layer_view_id = null,
    grant_lots_view_flag = false,
    demo_layer_view_flag = false,
    castello_layer_view_flag = false,
	dgrants_layer_view_flag = false;
	
$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();

/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
	"pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";




/////////////////////////////
//ADD MAP CONTAINER
/////////////////////////////
/*
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/nittyjee/ck2f3s0ks0u8o1cpfruf0qne6",
	hash: true,
	center: [-74.01229, 40.70545],
	zoom: 16.7,
	pitchWithRotate: false,
	attributionControl: false
});
*/

        var beforeMap = new mapboxgl.Map({
            container: 'before',
            style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
            center: [0, 0],
            zoom: 0,
			attributionControl: false
        });

        var afterMap = new mapboxgl.Map({
            container: 'after',
            style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
            center: [0, 0],
            zoom: 0,
			attributionControl: false
        });

        var map = new mapboxgl.Compare(beforeMap, afterMap, {
            // Set this to enable comparing two maps by mouse movement:
            // mousemove: true
        });

        /////////////////////////////
        //ADD NAVIGATION CONTROLS (ZOOM IN AND OUT)
        /////////////////////////////

        //Before map
        var nav = new mapboxgl.NavigationControl();
        beforeMap.addControl(nav, "top-right");

        //After map
        var nav = new mapboxgl.NavigationControl();
        afterMap.addControl(nav, "top-right");



        /////////////////////////////
        //BASEMAP MENU SWITCHING FUNCTIONALITY
		/////////////////////////////


		//RIGHT MENU
		/*
        var rightLayerList = document.getElementById('basemapmenuRight');
        var rightInputs = rightLayerList.getElementsByTagName('input');
		*/
        var rightInputs = document.getElementsByName('rtoggle');
		
        function switchRightLayer(layer) {
            //afterMap.removeLayer('c7_dates-ajsksu');
			//console.warn(afterMap.getStyle().layers);
			//afterMap.remove();
			
            var rightLayerClass = layer.target.className; //*A layer.target.id;
            afterMap.setStyle('mapbox://styles/nittyjee/' + rightLayerClass);
        }

        for (var i = 0; i < rightInputs.length; i++) {
            rightInputs[i].onclick = switchRightLayer;
		}


		//LEFT MENU
		/*
        var leftLayerList = document.getElementById('basemapmenuLeft');
        var leftInputs = leftLayerList.getElementsByTagName('input');
        */
		var leftInputs = document.getElementsByName('ltoggle');
		
        function switchLeftLayer(layer) {
            //afterMap.removeLayer('c7_dates-ajsksu');
			//console.warn(afterMap.getStyle().layers);
			//afterMap.remove();
			
            var leftLayerClass = layer.target.className; //*A layer.target.id;
            beforeMap.setStyle('mapbox://styles/nittyjee/' + leftLayerClass);
        }

        for (var i = 0; i < leftInputs.length; i++) {
            leftInputs[i].onclick = switchLeftLayer;
		}


/////////////////////////////
//ADD NAVIGATION CONTROL (ZOOM IN AND OUT)
/////////////////////////////
/*
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");
*/




/////////////////////////////
//NOT SURE WHAT THIS IS
/////////////////////////////

urlHash = window.location.hash;
var castello_click_ev = false,
    grant_lots_click_ev = false,
	demo_taxlot_click_ev = false,
	dutch_grant_click_ev = false;
    

var afterMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var coordinates = [];
var places_popup_html = "";

var afterMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var afterMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

/*
        new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 10

        });
*/

var hoveredStateIdRight = null,
    hoveredStateIdLeft = null,
	hoveredStateIdRightCircle = null,
    hoveredStateIdLeftCircle = null,
	hoveredGrantStateIdRight = null,
	hoveredGrantStateIdLeft = null,
	hoveredGrantLotIdRight = null,
	hoveredGrantLotIdLeft = null,
	hoveredDutchGrantIdRight = null,
	hoveredDutchGrantIdLeft = null;
	
var clickedStateId = null;
	
/*
afterMapPopUp.on('close', function(e) {
    if(beforeMapPopUp.isOpen()) {
		beforeMapPopUp.remove();
		if(demo_layer_view_flag) {
		    $("#demoLayerInfo").slideUp();
		    demo_layer_view_flag = false;
		}
	}
});

beforeMapPopUp.on('close', function(e) {
    if(afterMapPopUp.isOpen()) {
		afterMapPopUp.remove();
		if(demo_layer_view_flag) {
		    $("#demoLayerInfo").slideUp();
		    demo_layer_view_flag = false;
		}
    }
});

afterMapPlacesPopUp.on('close', function(e) {
    if(beforeMapPlacesPopUp.isOpen()) {
		beforeMapPlacesPopUp.remove();
		if(castello_layer_view_flag) {
		    $("#infoLayerCastello").slideUp();
		    castello_layer_view_flag = false;
		}
	}
});

beforeMapPlacesPopUp.on('close', function(e) {
    if(afterMapPlacesPopUp.isOpen()) {
		afterMapPlacesPopUp.remove();
		if(castello_layer_view_flag) {
		    $("#infoLayerCastello").slideUp();
		    castello_layer_view_flag = false;
		}
    }
});
*/

beforeMap.on("load", function () {
	console.log("load");
	//*A var sliderVal = $("#date").val();
	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    /*
	$("#linkButton").on("click", function () {
		document.location.href = "raster-version.html" + urlHash;
	});
	*/
	/*
	beforeMap.on('click', function () {
		if(demo_layer_view_flag) { 
            $("#demoLayerInfo").slideUp();
			demo_layer_view_flag = false;
		}
		if(castello_layer_view_flag) { 
            $("#infoLayerCastello").slideUp();
			castello_layer_view_flag = false;
		}
		if(layer_view_flag) {
			$('#view-hide-layer-panel').trigger('click');
		}
	});
    */
	
	//if (beforeMap.getLayer("c7_dates-ajsksu-left")) 
	//if (beforeMap.getLayer("places-left"))
	
		// CLICK AND OPEN POPUP
		beforeMap.on('click', 'c7_dates-ajsksu-left', function (e) {
		            if(demo_layer_view_flag) {
				        $("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
					} else {
						
						
						buildPopUpInfo(e.features[0].properties);
					    $("#demoLayerInfo").slideDown();
						demo_layer_view_flag = true;
						if(!layer_view_flag) $('#view-hide-layer-panel').trigger('click');
					}
					
	                demo_taxlot_click_ev = true;
		}).on('click', 'places-left', function (e) {
			if(castello_layer_view_flag && (clickedStateId == e.features[0].id) ) {
				        $("#infoLayerCastello").slideUp();
						castello_layer_view_flag = false;
		    } else {
				   clickedStateId = e.features[0].id;
				
				
					places_popup_html = "<h3>Castello Taxlot (1660)</h3><hr>" +
						"<br>" +
						"<b>" + "Taxlot: " + "</b>" + 
						e.features[0].properties.LOT2 +
						"<br>" +
						"<b>" + "Property Type: " + "</b>" + 
						e.features[0].properties.tax_lots_1 +
						"<br>" +
						"<br>" +
						"<b>" + "Encyclopedia Page: " + "</b>" + 
						"<br>" +
						'<a href="' + e.features[0].properties.new_link + '" target="_blank">' + e.features[0].properties.new_link + '</a>';
					
					$("#infoLayerCastello").html(places_popup_html).slideDown();
				    castello_layer_view_flag = true;
					if(!layer_view_flag) $('#view-hide-layer-panel').trigger('click');
			}
			
			castello_click_ev = true;
        }).on('click', 'grant-lots-left' , function (e) {
				        
						if(layer_view_flag) {
							if(grant_lots_view_id == e.features[0].id) {
								if(grant_lots_view_flag) {
							        $("#infoLayerGrantLots").slideUp(); 
									grant_lots_view_flag = false;
								} else {
									//$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
									buildGrantLotsPopUpInfo(e.features[0].properties);
							        $("#infoLayerGrantLots").slideDown();
								    grant_lots_view_flag = true;
								}
							} else {
			                    //$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
								buildGrantLotsPopUpInfo(e.features[0].properties);
							    $("#infoLayerGrantLots").slideDown();
								grant_lots_view_flag = true;
							}
							grant_lots_view_id = e.features[0].id;
						} else {
							//$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
							buildGrantLotsPopUpInfo(e.features[0].properties);
							$("#infoLayerGrantLots").slideDown();
							$('#view-hide-layer-panel').trigger('click');
							grant_lots_view_id = null;
					    } 
						
						grant_lots_click_ev = true;
						
		}).on('click', 'grants1-5sp9tb-left' , function (e) {
				        
						if(layer_view_flag) {
							if(dgrants_layer_view_id == e.features[0].id) {
								if(dgrants_layer_view_flag) {
							        $("#infoLayerDutchGrants").slideUp(); 
									dgrants_layer_view_flag = false;
								} else {
									buildDutchGrantPopUpInfo(e.features[0].properties);
							        $("#infoLayerDutchGrants").slideDown();
								    dgrants_layer_view_flag = true;
								}
							} else {
								buildDutchGrantPopUpInfo(e.features[0].properties);
							    $("#infoLayerDutchGrants").slideDown();
								dgrants_layer_view_flag = true;
							}
							dgrants_layer_view_id = e.features[0].id;
						} else {
							buildDutchGrantPopUpInfo(e.features[0].properties);
							$("#infoLayerDutchGrants").slideDown();
							$('#view-hide-layer-panel').trigger('click');
							dgrants_layer_view_id = null;
					    } 
						
						dutch_grant_click_ev = true;
						
		}).on('click', function () {
					
					if(!demo_taxlot_click_ev && !castello_click_ev && !grant_lots_click_ev && !dutch_grant_click_ev) {
						/*
						$("#infoLayerGrantLots").slideUp(); 
						grant_lots_view_flag = false;
                        $("#demoLayerInfo").slideUp();
			            demo_layer_view_flag = false;
                        $("#infoLayerCastello").slideUp();
			            castello_layer_view_flag = false;
						*/
						
						//*A
                        if(windoWidth > 555)
			                $('#view-hide-layer-panel').trigger('click');
					}
					
					demo_taxlot_click_ev = false;
					castello_click_ev = false;
					grant_lots_click_ev = false;
					dutch_grant_click_ev = false;
		});
	
	
});

afterMap.on("load", function () {
	console.log("load");
	//*A var sliderVal = $("#date").val();
	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    /*
	$("#linkButton").on("click", function () {
		document.location.href = "raster-version.html" + urlHash;
	});
	*/
	
	//if (afterMap.getLayer("c7_dates-ajsksu-right"))
    //if (afterMap.getLayer("places-right"))
	
		// CLICK AND OPEN POPUP
		afterMap.on('click', 'c7_dates-ajsksu-right', function (e) {
			        if(demo_layer_view_flag) {
				        $("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
						//if(afterMapPopUp.isOpen()) afterMapPopUp.remove();
					} else {
						
						buildPopUpInfo(e.features[0].properties);
					    $("#demoLayerInfo").slideDown();
						demo_layer_view_flag = true;
						if(!layer_view_flag) $('#view-hide-layer-panel').trigger('click');
					}
					demo_taxlot_click_ev = true;
		}).on('click', 'places-right', function (e) {
			if(castello_layer_view_flag && (clickedStateId == e.features[0].id) ) {
				        $("#infoLayerCastello").slideUp();
						castello_layer_view_flag = false;
						//if(afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
		    } else {
				    clickedStateId = e.features[0].id;
				
					places_popup_html = "<h3>Castello Taxlot (1660)</h3><hr>" +
						"<br>" +
						"<b>" + "Taxlot: " + "</b>" + 
						e.features[0].properties.LOT2 +
						"<br>" +
						"<b>" + "Property Type: " + "</b>" + 
						e.features[0].properties.tax_lots_1 +
						"<br>" +
						"<br>" +
						"<b>" + "Encyclopedia Page: " + "</b>" + 
						"<br>" +
						'<a href="' + e.features[0].properties.new_link + '" target="_blank">' + e.features[0].properties.new_link + '</a>';
					
					$("#infoLayerCastello").html(places_popup_html).slideDown();
				    castello_layer_view_flag = true;
					if(!layer_view_flag) $('#view-hide-layer-panel').trigger('click');
			}
		    castello_click_ev = true;
        }).on('click', 'grant-lots-right' , function (e) {
				        
						if(layer_view_flag) {
							if(grant_lots_view_id == e.features[0].id) {
								if(grant_lots_view_flag) {
							        $("#infoLayerGrantLots").slideUp();
                                    //if(afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();						
									grant_lots_view_flag = false;
								} else {
									//$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
									buildGrantLotsPopUpInfo(e.features[0].properties);
							        $("#infoLayerGrantLots").slideDown();
								    grant_lots_view_flag = true;
								}
							} else {
			                    //$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
								buildGrantLotsPopUpInfo(e.features[0].properties);
							    $("#infoLayerGrantLots").slideDown();
								grant_lots_view_flag = true;
							}
							grant_lots_view_id = e.features[0].id;
						} else {
							//$("#infoLayerGrantLots").html(e.features[0].properties.name).slideDown();
							buildGrantLotsPopUpInfo(e.features[0].properties);
							$("#infoLayerGrantLots").slideDown();
							$('#view-hide-layer-panel').trigger('click');
							grant_lots_view_id = null;
					    } 
						
						grant_lots_click_ev = true;
						
		}).on('click', 'grants1-5sp9tb-right' , function (e) {
				        
						if(layer_view_flag) {
							if(dgrants_layer_view_id == e.features[0].id) {
								if(dgrants_layer_view_flag) {
							        $("#infoLayerDutchGrants").slideUp(); 
									dgrants_layer_view_flag = false;
									//if(afterMapDutchGrantPopUp.isOpen()) afterMapDutchGrantPopUp.remove();
								} else {
									buildDutchGrantPopUpInfo(e.features[0].properties);
							        $("#infoLayerDutchGrants").slideDown();
								    dgrants_layer_view_flag = true;
								}
							} else {
								buildDutchGrantPopUpInfo(e.features[0].properties);
							    $("#infoLayerDutchGrants").slideDown();
								dgrants_layer_view_flag = true;
							}
							dgrants_layer_view_id = e.features[0].id;
						} else {
							buildDutchGrantPopUpInfo(e.features[0].properties);
							$("#infoLayerDutchGrants").slideDown();
							$('#view-hide-layer-panel').trigger('click');
							dgrants_layer_view_id = null;
					    } 
						
						dutch_grant_click_ev = true;
						
		}).on('click', function () {
			        if(!demo_taxlot_click_ev && !castello_click_ev && !grant_lots_click_ev && !dutch_grant_click_ev) {
						/*
						$("#infoLayerGrantLots").slideUp(); 
						grant_lots_view_flag = false;
                        $("#demoLayerInfo").slideUp();
			            demo_layer_view_flag = false;
                        $("#infoLayerCastello").slideUp();
			            castello_layer_view_flag = false;
                        */
						
			            //*A 
						if(windoWidth > 555)
						    $('#view-hide-layer-panel').trigger('click');
					}
					
					demo_taxlot_click_ev = false;
					castello_click_ev = false;
					grant_lots_click_ev = false;	
					dutch_grant_click_ev = false;
		});

	
});

beforeMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

        /*
        beforeMap.on('click', function () {
			        if(demo_layer_view_flag) {
				        $("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
					}
		});
		
		afterMap.on('click', function () {
			        if(demo_layer_view_flag) {
				        $("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
					}
		});
		*/

//////////////////////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
//////////////////////////////////////////////


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


	///////////////////////////////
	//LAYERS FOR FILTERING
	///////////////////////////////


	//NAHC
	beforeMap.setFilter("grants1-5sp9tb-left", dateFilter);
    afterMap.setFilter("grants1-5sp9tb-right", dateFilter);
	
	beforeMap.setFilter("c7_dates-ajsksu-left", dateFilter);
	afterMap.setFilter("c7_dates-ajsksu-right", dateFilter);
	
	beforeMap.setFilter("grant-lots-left", dateFilter);
	afterMap.setFilter("grant-lots-right", dateFilter);

	var layer_features = afterMap.queryRenderedFeatures({ layers: ['c7_dates-ajsksu-right'] });
	//console.log(layer_features[0].properties.DATE2);
	//console.log(layer_features[0].properties);
	//buildPopUpInfo(layer_features[0].properties);
	                if(demo_layer_view_flag) {
						buildPopUpInfo(layer_features[0].properties);
					}
	
}//end function changeDate









/////////////////////////////
//LAYERS AND LEGEND
/////////////////////////////

function addGrantLotsBeforeLayers(date) {
	
	//REMOVING TAX LOT POINTS IF EXIST
		if (beforeMap.getLayer("grant-lots-left")) beforeMap.removeLayer("grant-lots-left");
        if (beforeMap.getSource("grant_lot_c7-6s06if")) beforeMap.removeSource("grant_lot_c7-6s06if");
	
	
	// Add a layer showing the places.
	        beforeMap.addLayer({
                id: "grant-lots-left",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.4498iwgn"
                },
				layout: {
                    visibility: document.getElementById('grant_lots').checked ? "visible" : "none",
                },
                "source-layer": "grant_lot_c7-6s06if",
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
					'fill-outline-color': "#FF0000"
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
					
			
			//CURSOR ON HOVER
            //ON HOVER
			beforeMap.on('mouseenter', 'grant-lots-left', function (e) {
                beforeMap.getCanvas().style.cursor = 'pointer';
				beforeMapGrantLotPopUp.setLngLat(e.lngLat).addTo(beforeMap);
			});
			
            beforeMap.on('mousemove', 'grant-lots-left', function (e) {
				if (e.features.length > 0) {
                    if (hoveredGrantLotIdLeft) {
                        beforeMap.setFeatureState(
                            { source: 'grant-lots-left', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdLeft},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredGrantLotIdLeft = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'grant-lots-left', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdLeft},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
			    
                 
                 
				    var PopUpHTML = "<div class='infoLayerGrantLotsPopUp'>" +
									e.features[0].properties.name + "<br>" +
											"<b>Start:</b> " + e.features[0].properties.day1 + ", " + e.features[0].properties.year1 + "<br>" +
											"<b>End:</b> " + e.features[0].properties.day2 + ", " + e.features[0].properties.year2 + "<br>" +
											//"<br>" +
											"<b>Lot Division: </b>" + e.features[0].properties.dutchlot +
									"</div>";
					
					
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //BEFORE MAP POP UP CONTENTS
                beforeMapGrantLotPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			beforeMap.on('mouseleave', 'grant-lots-left', function () {
                beforeMap.getCanvas().style.cursor = '';
				if (hoveredGrantLotIdLeft) {
                    beforeMap.setFeatureState(
                        { source: 'grant-lots-left', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdLeft},
                        { hover: false }
                    );
                }
                hoveredGrantLotIdLeft = null;		
				if(beforeMapGrantLotPopUp.isOpen()) beforeMapGrantLotPopUp.remove();
            });
			
			
}


function addCastelloBeforeLayers() {
	
	// Add a layer showing the places.
	        beforeMap.addLayer({
                id: "places-left",
                type: "circle",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.ap08s4n9"
                },
				layout: {
                    visibility: document.getElementById('castello_points').checked ? "visible" : "none",
                },
                "source-layer": "castello_points_new-3qkr6t",
                paint: {
                    'circle-color': '#FF0000',
					'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#FF0000',
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                }
            });


            //POP UP
			/*
            beforeMap.on('click', 'places-left', function (e) {
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

                    //BEFORE MAP POP UP CONTENTS
                    .setHTML(
                        e.features[0].properties.LOT2 +
                        "<br>" +
                        e.features[0].properties.tax_lots_1 +
                        "<br>" +
                        e.features[0].properties.tax_lots_2 +
                        "<br>" +
                        '<a href="' + e.features[0].properties.new_link + '" target="_blank">' + e.features[0].properties.new_link + '</a>'
                    )

                    .addTo(beforeMap);
            });
            */
			
            //CURSOR ON HOVER

            //ON HOVER
            beforeMap.on('mouseenter', 'places-left', function (e) {
                beforeMap.getCanvas().style.cursor = 'pointer';
				if (e.features.length > 0) {
                    if (hoveredStateIdLeft) {
                        beforeMap.setFeatureState(
                            { source: 'places-left', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdLeft},
                            { hover: false }
                        );
                    }
                    hoveredStateIdLeft = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'places-left', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdLeft},
                        { hover: true }
                    );
					
			    coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //BEFORE MAP POP UP CONTENTS
                beforeMapPlacesPopUp
                    .setLngLat(coordinates)
                    .setHTML(
                        "<div class='infoLayerCastelloPopUp'>" + "<b>Taxlot (1660):</b> " + "<br>" + e.features[0].properties.LOT2 + "</div>"
                    )
                    .addTo(beforeMap);
					
				}
            });

            //OFF HOVER
            beforeMap.on('mouseleave', 'places-left', function () {
                beforeMap.getCanvas().style.cursor = '';
				if (hoveredStateIdLeft) {
                    beforeMap.setFeatureState(
                        { source: 'places-left', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdLeft},
                        { hover: false }
                    );
                }
                hoveredStateIdLeft = null;	
				if(beforeMapPlacesPopUp.isOpen()) beforeMapPlacesPopUp.remove();
            });
	
}


function addGrantLotsAfterLayers(date) {
	
	//REMOVING TAX LOT POINTS IF EXIST
	    if (afterMap.getLayer("grant-lots-right")) afterMap.removeLayer("grant-lots-right");
        if (afterMap.getSource("grant_lot_c7-6s06if")) afterMap.removeSource("grant_lot_c7-6s06if");
		
	// Add a layer showing the places.
	        afterMap.addLayer({
                id: "grant-lots-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.4498iwgn"
                },
				layout: {
                    visibility: document.getElementById('grant_lots').checked ? "visible" : "none",
                },
                "source-layer": "grant_lot_c7-6s06if",
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
					'fill-outline-color': "#FF0000"
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
			
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'grant-lots-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapGrantLotPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'grant-lots-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredGrantLotIdRight) {
                        afterMap.setFeatureState(
                            { source: 'grant-lots-right', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredGrantLotIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'grant-lots-right', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
			    
                 
                 
				    var PopUpHTML = "<div class='infoLayerGrantLotsPopUp'>" +
									e.features[0].properties.name + "<br>" +
											"<b>Start:</b> " + e.features[0].properties.day1 + ", " + e.features[0].properties.year1 + "<br>" +
											"<b>End:</b> " + e.features[0].properties.day2 + ", " + e.features[0].properties.year2 + "<br>" +
											//"<br>" +
											"<b>Lot Division: </b>" + e.features[0].properties.dutchlot +
									"</div>";
					
					
				coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapGrantLotPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'grant-lots-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredGrantLotIdRight) {
                    afterMap.setFeatureState(
                        { source: 'grant-lots-right', sourceLayer: 'grant_lot_c7-6s06if', id: hoveredGrantLotIdRight},
                        { hover: false }
                    );
                }
                hoveredGrantLotIdRight = null;		
				if(afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();
            });
}


function addCastelloAfterLayers() {
	
	// Add a layer showing the places.
            afterMap.addLayer({
                id: "places-right",
                type: "circle",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.ap08s4n9"
                },
				layout: {
                    visibility:  document.getElementById('castello_points').checked ? "visible" : "none",
                },
                "source-layer": "castello_points_new-3qkr6t",
                paint: {
                    'circle-color': '#FF0000',
					'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#FF0000',
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                }
            });


            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
			/*
            afterMap.on('click', 'places-right', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                new mapboxgl.Popup()
                    .setLngLat(coordinates)

                    .setHTML(
                        e.features[0].properties.LOT2 +
                        "<br>" +
                        e.features[0].properties.tax_lots_1 +
                        "<br>" +
                        e.features[0].properties.tax_lots_2 +
                        "<br>" +
                        '<a href="' + e.features[0].properties.new_link + '" target="_blank">' + e.features[0].properties.new_link + '</a>'
                    )

                    .addTo(afterMap);
					
            });
			*/


            //CURSOR ON HOVER

            //ON HOVER
            afterMap.on('mouseenter', 'places-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				if (e.features.length > 0) {
                    if (hoveredStateIdRight) {
                        afterMap.setFeatureState(
                            { source: 'places-right', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdRight},
                            { hover: false }
                        );
                    }
                    hoveredStateIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'places-right', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdRight},
                        { hover: true }
                    );
					
					
			    coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //BEFORE MAP POP UP CONTENTS
                afterMapPlacesPopUp
                    .setLngLat(coordinates)
                    .setHTML(
                        "<div class='infoLayerCastelloPopUp'>" + "<b>Taxlot (1660):</b> " + "<br>" + e.features[0].properties.LOT2 + "</div>"
                    )
                    .addTo(afterMap);
				}
            });

            //OFF HOVER
            afterMap.on('mouseleave', 'places-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredStateIdRight) {
                    afterMap.setFeatureState(
                        { source: 'places-right', sourceLayer: 'castello_points_new-3qkr6t', id: hoveredStateIdRight},
                        { hover: false }
                    );
                }
                hoveredStateIdRight = null;		
				if(afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
            });
	
}


/////////////////////////////
//LAYER CHANGING
/////////////////////////////


//BASEMAP SWITCHING
beforeMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change")
	//switchBeforeStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addBeforeLayers(yr, date);
	addCastelloBeforeLayers();
	addGrantLotsBeforeLayers(date);
});
afterMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change after")
	//switchStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addAfterLayers(yr, date);
	addCastelloAfterLayers();
	addGrantLotsAfterLayers(date);
});







/////////////////////////////
//MAP LAYERS
/////////////////////////////

function addBeforeLayers(yr, date) {



	/////////////////
	//NAHC POINTS MAP
	/////////////////

	//beforeMap.on('load', function () {
		
		//REMOVING TAX LOT POINTS IF EXIST
		if (beforeMap.getLayer("c7_dates-ajsksu-left")) beforeMap.removeLayer("c7_dates-ajsksu-left");
        if (beforeMap.getSource("c7_dates-ajsksu")) beforeMap.removeSource("c7_dates-ajsksu");
		if (beforeMap.getLayer("grants1-5sp9tb-left")) beforeMap.removeLayer("grants1-5sp9tb-left");
        if (beforeMap.getSource("grants1-5sp9tb")) beforeMap.removeSource("grants1-5sp9tb");
       
	   
	    //ADD GRANTS POLYGONS

        beforeMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "grants1-5sp9tb-left",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.b5bpfqeb"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "grants1-5sp9tb",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
				"fill-outline-color": "#000000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});
		
		
		//CURSOR ON HOVER
            //ON HOVER
			beforeMap.on('mouseenter', 'grants1-5sp9tb-left', function (e) {
                beforeMap.getCanvas().style.cursor = 'pointer';
				beforeMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(beforeMap);
			});
			
            beforeMap.on('mousemove', 'grants1-5sp9tb-left', function (e) {
				if (e.features.length > 0) {
                    if (hoveredDutchGrantIdLeft) {
                        beforeMap.setFeatureState(
                            { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredDutchGrantIdLeft = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                 
                 
					var PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>" +
									"<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";		
					
					
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //BEFORE MAP POP UP CONTENTS
                beforeMapDutchGrantPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			beforeMap.on('mouseleave', 'grants1-5sp9tb-left', function () {
                beforeMap.getCanvas().style.cursor = '';
				if (hoveredDutchGrantIdLeft) {
                    beforeMap.setFeatureState(
                        { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                        { hover: false }
                    );
                }
                hoveredDutchGrantIdLeft = null;		
				if(beforeMapDutchGrantPopUp.isOpen()) beforeMapDutchGrantPopUp.remove();
            });
			

		//ADD TAX LOT POINTS
		beforeMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "c7_dates-ajsksu-left",
			type: "circle",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.8krf945a"
			},
			layout: {
                visibility: document.getElementById('circle_point').checked ? "visible" : "none",
            },
			"source-layer": "c7_dates-ajsksu",
			paint: {

				//CIRCLE COLOR
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

                    //CIRCLE OPACITY
                    'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': {
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
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ],


				//CIRCLE RADIUS
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
		// CLICK AND OPEN POPUP
        //*A



		// CHANGE TO CURSOR WHEN HOVERING
		beforeMap.on('mouseenter', 'c7_dates-ajsksu-left', function (e) {
			beforeMap.getCanvas().style.cursor = 'pointer';
			        //*A console.log(e.features[0].id);
					//*A console.log(e.features[0]);
					
			        if (hoveredStateIdLeftCircle) {
                        beforeMap.setFeatureState(
                            { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                            { hover: false }
                        );
                    }
                    hoveredStateIdLeftCircle = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                        { hover: true }
                    );
					
				coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				
				        beforeMapPopUp
				            .setLngLat(coordinates)
							.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://nahc-mapping.org/mappingNY/encyclopedia/taxlot/c7' target='_blank'>C7</a></h2></b></div>")
                            .addTo(beforeMap);
					
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		beforeMap.on('mouseleave', 'c7_dates-ajsksu-left', function () {
			beforeMap.getCanvas().style.cursor = '';
			    if (hoveredStateIdLeftCircle) {
                    beforeMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                        { hover: false }
                    );
                }
                hoveredStateIdLeftCircle = null;		
				if(beforeMapPopUp.isOpen()) beforeMapPopUp.remove();
		});
	//*A });
}


function addAfterLayers(yr, date) {

    //afterMap.on('load', function () {
        
		//REMOVING TAX LOT POINTS IF EXIST
        if (afterMap.getLayer("c7_dates-ajsksu-right")) afterMap.removeLayer("c7_dates-ajsksu-right");
        if (afterMap.getSource("c7_dates-ajsksu")) afterMap.removeSource("c7_dates-ajsksu");
		if (afterMap.getLayer("grants1-5sp9tb-right")) afterMap.removeLayer("grants1-5sp9tb-right");
        if (afterMap.getSource("grants1-5sp9tb")) afterMap.removeSource("grants1-5sp9tb");
       
	   
	    //ADD GRANTS POLYGONS

        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "grants1-5sp9tb-right",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.b5bpfqeb"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "grants1-5sp9tb",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
				"fill-outline-color": "#000000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


        //CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'grants1-5sp9tb-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'grants1-5sp9tb-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredDutchGrantIdRight) {
                        afterMap.setFeatureState(
                            { source: 'grants1-5sp9tb-right', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredDutchGrantIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'grants1-5sp9tb-right', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                 
					var PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>" +
									"<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";		
					
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapDutchGrantPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'grants1-5sp9tb-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredDutchGrantIdRight) {
                    afterMap.setFeatureState(
                        { source: 'grants1-5sp9tb-right', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdRight},
                        { hover: false }
                    );
                }
                hoveredDutchGrantIdRight = null;		
				if(afterMapDutchGrantPopUp.isOpen()) afterMapDutchGrantPopUp.remove();
            });
			


		//ADD TAX LOT POINTS

		afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "c7_dates-ajsksu-right",
			type: "circle",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.8krf945a"
			},
			layout: {
                visibility: document.getElementById('circle_point').checked ? "visible" : "none",
            },
			"source-layer": "c7_dates-ajsksu",
			paint: {

				//CIRCLE COLOR
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

                    //CIRCLE OPACITY
                    'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': {
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
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ],


				//CIRCLE RADIUS
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
		// CLICK AND OPEN POPUP
		//*A
		           
		            
                    
					
		// CHANGE TO CURSOR WHEN HOVERING
		afterMap.on('mouseenter', 'c7_dates-ajsksu-right', function (e) {
			afterMap.getCanvas().style.cursor = 'pointer';
					
			        if (hoveredStateIdRightCircle) {
                        afterMap.setFeatureState(
                            { source: 'c7_dates-ajsksu-right', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdRightCircle},
                            { hover: false }
                        );
                    }
                    hoveredStateIdRightCircle = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-right', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdRightCircle},
                        { hover: true }
                    );
					
				coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				
				        afterMapPopUp
				            .setLngLat(coordinates)
							.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://nahc-mapping.org/mappingNY/encyclopedia/taxlot/c7' target='_blank'>C7</a></h2></b></div>")
                            .addTo(afterMap);
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		afterMap.on('mouseleave', 'c7_dates-ajsksu-right', function () {
			afterMap.getCanvas().style.cursor = '';
			    if (hoveredStateIdRightCircle) {
                    afterMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-right', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdRightCircle},
                        { hover: false }
                    );
                }
                hoveredStateIdRightCircle = null;		
				if(afterMapPopUp.isOpen()) afterMapPopUp.remove();
		})
	//});
}




function buildPopUpInfo(props) {
				var popup_html =

					///////
					//TITLE
					///////
					"<b><h2>Demo Taxlot: <a href='https://nahc-mapping.org/mappingNY/encyclopedia/taxlot/c7' target='_blank'>C7</a></h2></b>" +
// CAN'T GET THE TAXLOT LINK TO WORK: <a href='https://nahc-mapping.org/mappingNY/encyclopedia/taxlot/c7'>
					////////////////
					//PROPERTY TYPE
					////////////////
					"<b>Property Type: </b>" +
					"House" +


					//LINE
					"<hr>" +


					/////////////
					//DATE RANGE
					////////////

					//FROM
					//example: June 3, 1643
					"<b> FROM: </b>" +
					props.DATE1 +

					//TO
					//example: January 19, 1659
					"<br>" +
					"<b> TO: </b>" +
					props.DATE2 +



					/////////////////////////////////////////////////////////////////////////////////////////////
					//UNKNOWN (DISPLAY TITLE AND EXPLANATION WHERE UNKNOWN OR NOTHING, %nbsp)
					//example 1: <br><br><b>TAXLOT EVENTS UNKNOWN</b><br>Needs research beyond sources used.
					//example 2: &nbsp;
					//////////////////////////////////////////////////////////////////////////////////////////////
					props.Unknown +



					//LINE
					"<hr>" +




					//KEEP THIS AS ALTERNATIVE WAY OF LINKING:
					//'<a href="' + props.tax_lots_3 + '" target="_blank">' + props.tax_lots_3 + '</a>'



					//////////////////////////////////////////////////
					//NEXT
					//example 1: <b>OWNERSHIP:</b><br>
					//example 2: <b>NEXT KNOWN OWNERSHIP:</b><br>
					//////////////////////////////////////////////////
					props.Next +




					///////////////////////
					//OWNERS EXAMPLES:
					//////////////////////

					//NOTE: Not sure if NULLs are a problem, check in the future.

					//TAXLOT EVENT PARTY ROLE 1
					//TO_PAR1 / TO_PAR2 / FROM_PAR1 / FROM PAR2
					//example 1: /nahc/encyclopedia/node/1537 hreflang="en" target="_blank">Joint Owner</a>
					//example 2: NULL

					//FROM PARTY 1 (ANCESTOR)
					//TO_1 / T0_2 / FROM_1 / FROM_2
					//example 1: /nahc/encyclopedia/node/1536 hreflang="en" target="_blank">Signatory</a>
					//example 2: NULL

					//TAXLOT ENTITY DESCRIPTIONS 2
					//TO_ENT1 / TO_ENT2 / FROM_ENT1 / FROM_ENT2
					//example 1: /nahc/encyclopedia/node/1535 hreflang="en" target="_blank">Corporation</a>
					//example 2: NULL




					//////////////////////////////////////////
					//TO OWNERS
					//examples: See Above (OWNER EXAMPLES)
					//////////////////////////////////////////



					//OWNER 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_PAR1 + ": " +
					"<br>" +
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_1 +
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.TO_ENT1 + ")" +
					"<br>" +
					"<br>" +

					//OWNER 2
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_PAR2 + ": " +
					"<br>" +
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_2 +
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.TO_ENT2 + ")" +

					"<br>" +
					"<br>" +



					//////////////////
					//TAXLOT EVENT
					//////////////////

					//TAXLOT EVENT TITLE
					//example 1: <b>TAXLOT EVENT:</b>
					//example 2: <b>NEXT TAXLOT EVENT:</b>
					props.Tax_Event +

					"<br>" +


					//TAXLOT EVENT TYPE
					//example: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					'<a href=https://nahc-mapping.org/mappingNY' + props.EVENT1 +
					"<hr>" +


					//////////////////////////////
					//FROM OWNERS
					//examples: see above, OWNER EXAMPLES
					//////////////////////////////


					//FROM TITLE
					//example 1: <b>FROM:</b>
					//example 2: <b>PREVIOUS KNOWN FROM:</b>
					props.Previous +

					"<br>" +

					//FROM 1

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_PAR1 + ": " +
					"<br>" +
					//FROM PARTY 1 (ANCESTOR)
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_1 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.FROM_ENT1 + ")" +
					"<br>" +
					"<br>" +


					//FROM 2

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_PAR2 + ": " +
					"<br>" +
					//FROM PARTY 2 (ANCESTOR)
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_2 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.FROM_ENT2 + ")" +




					///////////////////////////
					//PREVIOUS TAXLOT EVENT (SHOWS UP IF TAXLOT EVENTS UNKNOWN, OTHERWISE BLANK, &nbsp;)
					//////////////////////////

					//TITLE: "PREVIOUS TAXLOT EVENT"
					//example 1: <br><br><b>PREVIOUS TAXLOT EVENT:</b><br>
					//example 2: &nbsp;
					props.Event +

					//PREVIOUS TAXLOT EVENT
					//example 1: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					//example 2: &nbsp;
					'<a href=https://nahc-mapping.org/mappingNY' + props.Prev_Event +






					//LINK TO ALL TAXLOT EVENTS: "SEE ALL TAXLOT EVENTS"
					"<br>" +
					"<hr>" +
					'<b> <h3><a href="https://nahc-mapping.org/mappingNY/encyclopedia/taxlot-events" target="_blank">SEE ALL TAXLOT EVENTS</a></h3></b>'

//NEED TO MAKE THIS OPEN IN SEPARATE TAB!!
;

//console.log(popup_html);
$("#demoLayerInfo").html(popup_html);

}



function buildGrantLotsPopUpInfo(props) {
				var popup_html =
				    "<h3>Grant Lot Division</h3><hr>" +
					"<br>" +
					"<b>Original Dutch Grant: </b>" + props.Lot +
					"<br>" +
					"<b>Lot Division: </b>" + props.dutchlot +
				    "<br>" +
					"<b>Castello Taxlot (1660): </b>" + props.castello +
					"<br>" +
				    "<br>" +
				    "<b>Ownership:</b> " + props.name + "<br>" +
				    "<b>From:</b> " + props.from +
					"<br>" +
				    "<br>" +
					"<b>Start:</b> " + props.day1 + ", " + props.year1 + "<br>" +
					"<b>End:</b> " + props.day2 + ", " + props.year2 + "<br>" +
				    "<br>" +
				    "<b>Description:</b> " + "<br>" +
					props.descriptio + "<br><br>"
				;
				//console.log(props);
    
	$("#infoLayerGrantLots").html(popup_html);

}

function buildDutchGrantPopUpInfo(props) {
				var popup_html = 
				    "<h3>Dutch Grant</h3><hr>" +
				    props.name + "<br>" +
				    "<b>Dutch Grant Lot:</b> <i>" + props.Lot + "</i><br>" +
					"<br>" +
					"<b>Start:</b> <i>" + props.day1 + " " + props.year1 + "</i><br>" +
					"<b>End:</b> <i>" + props.day2 + " " + props.year2 + "</i><br>" +
					"<br>" +
					"<b>Description (partial):</b>" +
					"<br>" +
					props.descriptio + "<br><br>"
				;
				//console.log(props);
    
	$("#infoLayerDutchGrants").html(popup_html);

}

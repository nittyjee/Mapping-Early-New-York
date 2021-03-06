
//////////////////
// Dynamic Layers
//////////////////

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



/////////////////////////
// Castello Static Layer
/////////////////////////

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


                //AFTER MAP POP UP CONTENTS
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


/////////////////////////
// Current Static Layers
/////////////////////////

function addCurrentLotsAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-lots-right")) afterMap.removeLayer("curr-lots-right");
        if (afterMap.getSource("current_lots_1-ca6kq1")) afterMap.removeSource("current_lots_1-ca6kq1");
	
	        afterMap.addLayer({
                id: "curr-lots-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.441lyesf"
                },
				layout: {
                    visibility: document.getElementById('current_lots').checked ? "visible" : "none",
                },
                "source-layer": "current_lots_1-ca6kq1",
                paint: {
				"fill-color": "#7B68EE",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
				"fill-outline-color": "#000000"
                }
			
            });
			
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'curr-lots-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapCurrLotsPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'curr-lots-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredCurrLotsIdRight) {
                        afterMap.setFeatureState(
                            { source: 'curr-lots-right', sourceLayer: 'current_lots_1-ca6kq1', id: hoveredCurrLotsIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredCurrLotsIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'curr-lots-right', sourceLayer: 'current_lots_1-ca6kq1', id: hoveredCurrLotsIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    //console.log(e.features[0].properties);
                    //Address
					//OwnerName
					var PopUpHTML = "<div class='infoLayerCurrLotsPopUp'>" + e.features[0].properties.Address + "<br>" +
									"<b>Current Lot: </b>" + e.features[0].properties.Lot + "</div>";		
					
					/*
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				*/


                //AFTER MAP POP UP CONTENTS
                afterMapCurrLotsPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });
	
	
            //OFF HOVER
			afterMap.on('mouseleave', 'curr-lots-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredCurrLotsIdRight) {
                    afterMap.setFeatureState(
                        { source: 'curr-lots-right', sourceLayer: 'current_lots_1-ca6kq1', id: hoveredCurrLotsIdRight},
                        { hover: false }
                    );
                }
                hoveredCurrLotsIdRight = null;		
				if(afterMapCurrLotsPopUp.isOpen()) afterMapCurrLotsPopUp.remove();
            });
}


function addCurrentBuildingsAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-builds-right")) afterMap.removeLayer("curr-builds-right");
        if (afterMap.getSource("current_buildings_1-cjgsm")) afterMap.removeSource("current_buildings_1-cjgsm");
	
	        afterMap.addLayer({
                id: "curr-builds-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.8zoowskg"
                },
				layout: {
                    visibility: document.getElementById('current_buildings').checked ? "visible" : "none",
                },
                "source-layer": "current_buildings_1-cjgsm0",
                paint: {
				"fill-color": "#FF7F50",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
				"fill-outline-color": "#000000"
                }
			
            });
}

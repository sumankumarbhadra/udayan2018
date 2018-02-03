jQuery(document).ready(function($){
	//set your google maps parameters
	var latitude = 51.5255069,
		longitude = -0.0836207,
		map_zoom = 14;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';
		
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#222a2c',
		saturation_value= -50,
		brightness_value= -5;

	//we define here the style of the map
	var style= [ 
		
        {
        "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
                    }, {
                "lightness": 17
                    }]
                }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
                    }, {
                "lightness": 20
                    }]
                }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
                    }, {
                "lightness": 17
                    }]
                }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
                    }, {
                "lightness": 29
                    }, {
                "weight": 0.2
                    }]
                }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
                    }, {
                "lightness": 18
                    }]
                }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
                    }, {
                "lightness": 16
                    }]
                }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
                    }, {
                "lightness": 21
                    }]
                }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
                    }, {
                "lightness": 21
                    }]
                }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
                    }, {
                "color": "#ffffff"
                    }, {
                "lightness": 16
                    }]
                }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
                    }, {
                "color": "#333333"
                    }, {
                "lightness": 40
                    }]
                }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
                    }]
                }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
                    }, {
                "lightness": 19
                    }]
                }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
                    }, {
                "lightness": 20
                    }]
                }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
                    }, {
                "lightness": 17
                    }, {
                "weight": 1.2
                    }]
                }
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});

  
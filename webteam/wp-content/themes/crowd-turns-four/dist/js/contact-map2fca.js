var mapController = (function() {
    'use strict';

    var map,
        index = 0,
        icon,
        geoUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + googleKey,
        geo,
        distances,
        closestOffice,
        mapElement,
        markers = [],
        mobile;

    function init() {
        mapElement = document.getElementById('contact-map');

        if(!mapElement) {
            return;
        }

        ajax({
            headers: {
                'content-type': 'application/json'
            }
        }).post(geoUrl, {}).then(function(r, xhr) {
            if(xhr.status !== 200) {
                return;
            }

            geo = r.location;
            setupMap();
        });

        mobile = window.matchMedia( "(max-width: 670px)" );
    }

    function setupMap() {

        if ( location.search.indexOf('?office=') != -1 ) {
            closestOffice = crowdOffices.filter(filterOffices)[0];
            closestOffice ? closestOffice : getClosestOffice(); // if the parameter doesn't match an office
        } else {
            getClosestOffice();
        }

        map = new google.maps.Map(mapElement, {
            scrollwheel: false,
            zoom: 14,
            center: {
                lat: closestOffice.location.lat,
                lng: closestOffice.location.lng
            },
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            disableDoubleClickZoom: true,
            styles: JSON.parse(closestOffice.map_style)
        });

        if(!map) {
            return;
        }

        if(!mobile.matches) {
            map.panBy(-200, 50);
        }

        crowdOffices.forEach(makeMarker);
        // So info bar is updated
        crowdClock.changeOffice(closestOffice.city);
    }

    function filterOffices(office) {
        return office.city === location.search.split('?office=')[1].replace(/\+/g, ' ')
    }

    function getClosestOffice() {
        distances = crowdOffices.map(function(o) {
            return distance(geo.lat, geo.lng, o.location.lat, o.location.lng, 'K');
        });

        closestOffice = crowdOffices[distances.indexOf(distances.reduce(function(c, p) {
            if(c < p) {
                return c;
            }

            return p;
        }))];
    }


    function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
    }

    function genIcon(scale, color) {
        return {
            path: 'M34.7695,0A34.7693,34.7693,0,0,0,0,34.7693C0,53.9718,34.7695,100,34.7695,100S69.5388,53.9718,69.5388,34.7693A34.7693,34.7693,0,0,0,34.7695,0Zm0,54.5333a20.19,20.19,0,1,1,20.19-20.19A20.19,20.19,0,0,1,34.7695,54.5333Z',
            fillColor: color || '#ffffff',
            fillOpacity: 1,
            anchor: new google.maps.Point(34.7695, 100),
            strokeWeight: 0,
            scale: scale || 0.5
        };
    }

    function makeMarker(o) {
        markers.push(new google.maps.Marker({
            position: {
                lat: o.location.lat,
                lng: o.location.lng
            },
            map: map,
            draggable: false,
            icon: genIcon(0.5, '#ffffff') // default style
        }));
    }

    function update(o) {
        map.panTo({
            lat: o.location.lat,
            lng:  o.location.lng
        });
        if(!mobile.matches) {
            map.panBy(-200, 50);
        }
        if(o.map_style.length) {
            map.set('styles', JSON.parse(o.map_style));
        }
    }

    return {
        update: update,
        init: init
    };

}());

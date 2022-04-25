// The access token for MapBox
L.mapbox.accessToken = 'pk.eyJ1IjoiaW5vdXllZzIzIiwiYSI6ImNsMDBrYW91djBieTQzY285cnBzNDVtem8ifQ.gGlGhsPvneHkMe_jkTo-zg';

// Creates a map from mapbox
var map = L.mapbox.map('map')
    .setView([35.772, -78.790], 11)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/inouyeg23/cl00nbx3m00ei15oabya5ycyq')); 


/*
Source: Codrate.com
URL: http://codrate.com/questions/how-can-trigger-the-window-resize-event-manually-in-javascript
Use: Trigger window resize function in javascript
Note: map woudl not load properly, but only have changing window size. This fizes the map being the correct size
*/
function ESresize(){
    if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
    } else {
        //This will be executed on old browsers and especially IE
        var resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
    }
}

//call immedietly
ESresize();


// Adds search bar
var searchControl = new L.esri.Controls.Geosearch().addTo(map);
var results = new L.LayerGroup().addTo(map);
searchControl.on('results', function(data){
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

//creating a marker cluster group
var markers = new L.MarkerClusterGroup();

// add markers to map
function updateMarkers(data){
    //clear previous layers so it doesn't keep adding points to map
    markers.clearLayers();

    //creating new markers and adding it to a layer
    for (var i = 0; i < data.length; i++) {
        //setting the title to the crime name
        var title = data[i].crime;
        //changing the icon based crime name
        //ICON LIST: https://map.michelstuyts.be/icons/
        var icon = 'roadblock';
        switch(title){
            case "All Other Offenses":
                title = "Other";
                break;
            case "DUI":
                icon = 'car';
                break;
            case "Larceny":
                icon = 'pitch';
                break;
            case "Burglary":
                icon = 'commercial';
                break;
            case "Simple Assault":
                icon = 'cross';
                break;
            case "Aggravated Assault":
                icon = 'baseball';
                break;
            case "Motor Vehicle Theft":
                icon = 'scooter'
                break;
            case "Suicide":
                icon = 'danger';
                break;
            case "Embezzlement":
                icon = 'bank';
                break;
            case "Drugs":
                icon = 'pharmacy';
                break;
            case "Missing Person":
                icon = 'basketball';
                break;
        }
        //creating the actual marker
        var marker = L.marker(new L.LatLng(data[i].lat, data[i].long), {
            icon: L.mapbox.marker.icon({'marker-symbol': icon, 'marker-color': '409079'}),
            title: title
        });
        //adding pop-up to the marker
        marker.bindPopup(title);

        //assigning the marker to the cluster layer
        markers.addLayer(marker);
    }

    //adding the cluster layer to the map
    map.addLayer(markers);
    
}

// Make default cursor on map
//map.getCanvas().style.cursor = 'default';





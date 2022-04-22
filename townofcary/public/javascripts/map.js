// The access token for MapBox
mapboxgl.accessToken = 'pk.eyJ1IjoiaW5vdXllZzIzIiwiYSI6ImNsMDBrYW91djBieTQzY285cnBzNDVtem8ifQ.gGlGhsPvneHkMe_jkTo-zg';

// Creates a map from mapbox
var map = new mapboxgl.Map({
  container: 'map', //id of container
  style: 'mapbox://styles/inouyeg23/cl00nbx3m00ei15oabya5ycyq',
  center: [-78.790, 35.772], //[longitude, latitude]
  zoom: 10
});

// Make default cursor on map
map.getCanvas().style.cursor = 'default';

let hoveredStateId = null;

// Loads the map using data values from mapbox
map.on('load', () => {
  map.addSource('townofcary', {
    'type': 'geojson',
    // Use a URL for the value for the `data` property.
    'url': 'mapbox://inouyeg23.1wqkvt6q'
  });
  
  
  map.addLayer({
    'id': 'region_fill',
    'type': 'fill',
    'source': 'townofcary',
    'layout': {},
    'paint': {
      'fill-color': '#627BC1',
      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5]
    }
  });

  map.addLayer({
    'id': 'state-borders',
    'type': 'line',
    'source': 'townofcary',
    'layout': {},
    'paint': {
      'line-color': '#627BC1',
      'line-width': 2
    }
  });

  for(var i = 0; i < tableData.length; i++){
    console.log("lat: " + latData[i]);
    console.log("long: " + longData[i]);
    //var marker = new mapboxgl.Marker().setLngLat([tableData[i].long, tableData[i].lat]).addTo(map);
    
  }

  // Add the searchbar to the map.
  map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
  );
});

allMarkers = [];

function updateMarkers() {
  for(var i = 0; i < tableData.length; i++){
    console.log("lat: " + tableData[i].lat);
    console.log("long: " + tableData[i].long);
    var marker = new mapboxgl.Marker().setLngLat([tableData[i].long, tableData[i].lat]).addTo(map);
    
    //allMarkers.push(marker);
  }
}

function removeMarkers() {
  for(var i = 0; i < tableData.length; i++){
    marker.remove();
  }
}


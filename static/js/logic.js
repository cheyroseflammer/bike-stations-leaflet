// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;
// Create the createMap function.
function createMap(bikeStations) {
// Create the tile layer that will be the background of our map.
  let streetMap = L.tileLayer('https://api.mapbox.com/styles/v1/cheyflammer/ckvvshl0249ms14q779rg1bc2/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiY2hleWZsYW1tZXIiLCJhIjoiY2t3Mnoydm0wMjEwejJ2cGFlM2ZrZGp6NyJ9.eAtIi0WdUCOH0hsjDNb5kw"
  });
  // Create the map object with options.
  let myMap = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetMap, bikeStations]
  });

  // Create a baseMaps object to hold the lightmap layer.
  let baseMap = {
    "street map": streetMap
  }
  // Create an overlayMaps object to hold the bikeStations layer.
  let stationsOverlay = {
    "bike stations": bikeStations
  }
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMap, stationsOverlay, {
    collapse: false,

  }).addTo(myMap);

}
// Create the createMarkers function.
function createStations(response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
// Initialize an array to hold the bike markers.
  let stationMarkers = [];
// Loop through the stations array.
  for (let i = 0; i < stations.length; i++){
    let station = stations[i];
      // For each station, create a marker, and bind a popup with the station's name.
    let stationMarker = L.marker([station.lat, station.lon])
      .bindPopup(`<h3>${station.name}</h3><hr>${station.capacity}`);
    // Add the marker to the bikeMarkers array.
    stationMarkers.push(stationMarker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  let stationsLayer = L.layerGroup(stationMarkers);
  createMap(stationsLayer);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').then(createStations)
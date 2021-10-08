import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Fsb2RuYmkiLCJhIjoiY2t1aTk2cWJtMDE0ZjJ4bW83ejlqaDJodiJ9.SA9NLTjZ__-_z6KlGfxXQg';
const map = new mapboxgl.Map({
container: 'map', // container ID
/* style: 'mapbox://styles/mapbox/streets-v11', */ // style URL
style: 'mapbox://styles/galodnbi/ckui9zm50cuhv19nsapun1loc',
center: [2.3364, 48.86091], // starting position [lng, lat]
zoom: 15.75 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({
  color: "#171717",
  draggable: false
  }).setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "#757575",
  draggable: false
  }).setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({
  color: "#757575",
  draggable: false
  }).setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({
  color: "#757575",
  draggable: false
  }).setLngLat([2.3330, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({
  color: "#757575",
  draggable: false
  }).setLngLat([2.3365, 48.8625])
  .addTo(map);
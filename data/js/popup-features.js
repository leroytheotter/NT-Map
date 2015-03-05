/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
  element: container
});

//Here we are declaring the projection object for Web Mercator
var projection = ol.proj.get('EPSG:3857');

//Here we are declaring the raster layer as a separate object to put in the map later
var rasterLayer = new ol.layer.Tile({
  source: new ol.source.TileJSON({
	url: 'http://api.tiles.mapbox.com/v3/' +
		'mapbox.natural-earth-hypso-bathy.jsonp',
	crossOrigin: 'anonymous'
  })
});
      

//Let's create another layer from a kml file. We'll call it "vector" but it could be called anything
var vectorLayer = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		//normally this kml file would be sitting on your server
		url: 'data/kml/birthofchrist.kml'
	})	
});
		
/**
 * Create the map.
 */
var map = new ol.Map({
  layers: [rasterLayer, vectorLayer],
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});


map.on('click', function(evt) {
  //try to destroy it before doing anything else...s
  //$(element).popover('destroy');
  
  //Try to get a feature at the point of interest
  var feature = map.forEachFeatureAtPixel(evt.pixel,
	  function(feature, layer) {
		return feature;
	  });
	  
  //if we found a feature then create and show the popup.
  if (feature) {
	var geometry = feature.getGeometry();
	var coord = geometry.getCoordinates();
	overlay.setPosition(coord);
	var displaycontent = feature.get('description');
	content.innerHTML = displaycontent;
  }
});

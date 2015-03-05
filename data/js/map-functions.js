/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define mpa layer variables
var map,BaseMap;
var BoC, NazBeth, BethEgypt, Temple, Nazareth, Bapt, Wedding, SoM, WoW, Geth, Calvary, Rez;

//Define the default map projection
var projection = ol.proj.get('EPSG:3857');

//Function to set up the map. Called when the web page body loads.
function setup_map() {

    //Here we are declaring the projection object for Web Mercator
    projection = ol.proj.get('EPSG:3857');

    //Build the layer objects for each KML file
    CreateLayers();

    //Create a new map object and connect it to the right DIV id that is in the html.
    map = new ol.Map({
        target: 'map_id',

        //Set up the layers that will be loaded in the map
        layers: [Base],

        //Establish the view area. Note the reprojection from lat long (EPSG:4326) to Web Mercator (EPSG:3857)
        view: new ol.View({
            center: ol.proj.transform([-94.350243, 46.829781], 'EPSG:4326', 'EPSG:3857'),
            zoom: 1
        })
    });
}

//Location selection function
function LocationSelector(location)
{
    switch (location)
    {
        case "BoC":


    }
}

//Create the Layers
function CreateLayers() {
    BaseMap = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
    });

    BoC = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/birthofchrist.kml'
        })
    })

}
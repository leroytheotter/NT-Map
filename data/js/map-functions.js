/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define the default map projection
var projection = ol.proj.get('EPSG:3857');

//Define the BaseMap


//Define the KML Layers
var BoC;

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
    var BaseMap = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
    });

    BoC = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/birthofchrist.kml'
        })
    })

}
/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define the default map projection
var projection = ol.proj.get('EPSG:3857');

//Define the BaseMap
var BaseMap = new ol.layer.Tile({
    source: new ol.source.MapQuest({layer: 'osm'})
});
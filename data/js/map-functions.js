/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define mpa layer variables
var map,BaseMap;
var BoC, NazBeth, BethEgypt, Temple, Nazareth, Bapt, Wedding, SoM, WoW, Geth, Calvary, Rez;

//Define the default map projection
var projection = ol.proj.get('EPSG:3857');

/**********************************************************/
/*             Begin location selection function          */
/**********************************************************/
function LocationSelector(location)
{
    switch (location)
    {
        case "BoC":


    }
}
/**********************************************************/
/*             End location selection function            */
/**********************************************************/


/**********************************************************/
/*             Begin layer definition function            */
/**********************************************************/
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
/**********************************************************/
/*             End layer definition function              */
/**********************************************************/
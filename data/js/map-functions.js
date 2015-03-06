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



/**********************************************************/
/*                Begin map creation section              */
/**********************************************************/

function CreateMap() {

    //Build the layer objects for each KML file
    CreateLayers();

    //Declare the map object itself.
    map = new ol.Map({
        target: 'map',

        //Set up the layers that will be loaded in the map
        layers: [BaseMap, BoC],

        //Establish the view area. Note the reprojection from lat long (EPSG:4326) to Web Mercator (EPSG:3857)
        view: new ol.View({
            center: ol.proj.transform([35.2167, 31.7833], 'EPSG:4326', projection),
            zoom: 8
        })
    });

    //Add some useful map controls
    map.addControl(new ol.control.ScaleLine());

    //Add Popup system
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);

}

/**********************************************************/
/*                End map creation section                */
/**********************************************************/


/**********************************************************/
/*              Begin popup bubble scripting              */
/**********************************************************/

function PopUp_Bubble() {

    // display popup on click

    //try to destroy it before doing anything else
    $(element).popover('destroy');

    //Try to get a feature at the point of interest
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    //if we found a feature then create and show the popup.
    if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.setPosition(coord);
        var displaycontent = ('<b>' + feature.get('name') + '</b>' + '<br>'
        + '<br>' + feature.get('description')
        );
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': displaycontent
        });

        $(element).popover('show');

    } else {
        $(element).popover('destroy');
    }


}

/**********************************************************/
/*               End popup bubble scripting               */
/**********************************************************/
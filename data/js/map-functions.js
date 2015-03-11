/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define mpa layer variables
var map,BaseMap;
var BoC, NazBeth, BethEgypt, Temple, Nazareth, Bapt, Wedding, SoM, WoW, Geth, Calvary, Rez;

//Define the default map projection
var projection = ol.proj.get('EPSG:3857');



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
        layers: [BaseMap, BoC, Temple, Nazareth, Bapt, NazBeth],

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

    return map

}

/**********************************************************/
/*                End map creation section                */
/**********************************************************/


/**********************************************************/
/*             Begin location selection function          */
/**********************************************************/
function LocationSelector(location)
{
    var zoom_area = map.getView();

    switch (location)
    {
        case "None":
            //Hide all locations
            TurnAllLayersOff();
            //Add Popup system
            var element = document.getElementById('popup');

            //try to destroy it before doing anything else
            $(element).popover('destroy');

            map.getView().setCenter(ol.proj.transform([35.2167, 31.7833], 'EPSG:4326', projection));
            map.getView().setZoom(8);
            break;

        case "all":
            TurnAllLayersOff();
            //Add Popup system
             var element = document.getElementById('popup');

            //try to destroy it before doing anything else
            $(element).popover('destroy');

            //Show all locations
            var layers = map.getLayers().a;
            for (var i=1; i <= (layers.length); i++) {
                if (typeof layers[i] !== 'undefined') {
                    layers[i].setVisible(true);
                }
            }
            map.getView().setCenter(ol.proj.transform([35.2167, 31.7833], 'EPSG:4326', projection));
            map.getView().setZoom(8);
            break;

        case "BoC":
            //Show only Birth of Christ

            LocationSelector('none');

            TurnAllLayersOff();
            BoC.setVisible(true);
            var Coord = BoC.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            setTimeout(PopUp_FromFeature(BoC.getSource().getFeatures()[0]),500);
            break;


        case "Temple":
            //Show only Christ at the Temple

            LocationSelector('none');

            TurnAllLayersOff();
            Temple.setVisible(true);
            var Coord = Temple.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            setTimeout(PopUp_FromFeature(Temple.getSource().getFeatures()[0]),500);
            break;

        case "Nazareth":
            //Show only Nazareth
            TurnAllLayersOff();
            Nazareth.setVisible(true);
            var Coord = Nazareth.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Nazareth.getSource().getFeatures()[0]);
            break;

        case "Bapt":
            //Show baptism at river Jordan
            Bapt.setVisible(true);
            var Coord = Bapt.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Bapt.getSource().getFeatures()[0]);
            break;

        case "NazBeth":
            //Show baptism at river Jordan
            NazBeth.setVisible(true);
            var Coord = NazBeth.getSource().getFeatures()[0].getGeometry().getCoordinates();
            /*var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];*/
            map.getView().setCenter(Coord);
            map.getView().setZoom(9);
            PopUp_FromFeature(NazBeth.getSource().getFeatures()[0]);
            break;

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
    });

    Temple = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/temple.kml'
        })
    });

    Nazareth = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/Nazareth.kml'
        })
    });

    Bapt = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/baptism.kml'
        })
    });

    NazBeth = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/NazBeth.kml'
        })
    });
}
/**********************************************************/
/*             End layer definition function              */
/**********************************************************/


/**********************************************************/
/*              Begin popup bubble scripting              */
/**********************************************************/

function PopUp_Bubble(evt) {
    // Convert On-Click event to a feature for pass though to the main popup script

    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
        });

    PopUp_FromFeature(feature)
}

function PopUp_FromFeature(feature){

    //Add Popup system
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);

    // display popup on click

    //try to destroy it before doing anything else
    $(element).popover('destroy');

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


/**********************************************************/
/*              Begin disable layers script               */
/**********************************************************/

function TurnAllLayersOff() {
    //turn all the layers in the map off
    var layers = map.getLayers().a;
    for (var i = 1; i <= (layers.length); i++) {
        if (typeof layers[i] !== 'undefined') {
            layers[i].setVisible(false);
        }
    }

    //Add Popup system
    var element = document.getElementById('popup');

    //try to destroy it before doing anything else
    $(element).popover('destroy');

}

/**********************************************************/
/*               End disable layers script                */
/**********************************************************/
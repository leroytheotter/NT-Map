/**
 * Created by Ryan on 05 Mar 2015.
 */

//Define mpa layer variables
var map,BaseMap;
var BoC, NazBeth, BethEgypt, Temple, Nazareth, Bapt, Wedding, SoM, Water, Geth, Calvary, Rez, Feeds5000;

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
        layers: [BaseMap, BoC, Temple, Nazareth, Bapt, NazBeth, Water, Feeds5000],

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
            TurnAllLayersOff();
            BoC.setVisible(true);
            //Set the view as an offset to provide room for the popup
            var Coord = BoC.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(BoC.getSource().getFeatures()[0]);
            break;


        case "Temple":
            //Show only Christ at the Temple
            TurnAllLayersOff();
            Temple.setVisible(true);
            //Set the view as an offset to provide room for the popup
            var Coord = Temple.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Temple.getSource().getFeatures()[0]);
            break;

        case "Nazareth":
            //Show only Nazareth
            TurnAllLayersOff();
            Nazareth.setVisible(true);
            //Set the view as an offset to provide room for the popup
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
            TurnAllLayersOff();
            Bapt.setVisible(true);
            //Set the view as an offset to provide room for the popup
            var Coord = Bapt.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Bapt.getSource().getFeatures()[0]);
            break;

        case "NazBeth":
            //Show route from Nazareth to Bethlehem
            TurnAllLayersOff();
            NazBeth.setVisible(true);
            //Set the view as the extent of the polyline
            var extent = NazBeth.getSource().getExtent();
            map.getView().fitExtent(extent, map.getSize());
            //Find a vertex half way down the line, roughly, and set that as the popup location
            myCoords = NazBeth.getSource().getFeatures()[0].getGeometry().getCoordinates();
            midCoordIndex = parseInt(myCoords.length/2);
            midCoord = myCoords[midCoordIndex];
            PopUp_FromCoord(midCoord,NazBeth.getSource().getFeatures()[0]);
            break;

		case "Water":
            //Show Christ walks on Water
            TurnAllLayersOff();
            Water.setVisible(true);
            //Set the view as an offset to provide room for the popup
            var Coord = Water.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Water.getSource().getFeatures()[0]);
            break;
			
		case "Feeds5000":
            //Show Christ feeds 5000
            TurnAllLayersOff();
            Feeds5000.setVisible(true);
            //Set the view as an offset to provide room for the popup
            var Coord = Feeds5000.getSource().getFeatures()[0].getGeometry().getCoordinates();
            var x0 = Coord[0];
            var y0 = Coord[1];
            var center = [x0,y0+2500];
            map.getView().setCenter(center);
            map.getView().setZoom(13);
            PopUp_FromFeature(Feeds5000.getSource().getFeatures()[0]);
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
	
    Water = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/walkwater.kml'
        })
    });
	
    Feeds5000 = new ol.layer.Vector({
        source: new ol.source.KML({
            projection: projection,
            url: 'data/kml/feeds5000.kml'
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

    //Add Popup system
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);

    //Try to get a feature at the point of interest
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
        });

    //if we found a feature then create and show the popup.
    if (feature) {

        var coord = map.getCoordinateFromPixel(evt.pixel);
        PopUp_FromCoord(coord, feature)
    }
    else{
        $(element).popover('destroy');
    }

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

    }
    else {
        $(element).popover('destroy');
    }

}

function PopUp_FromCoord(coord, feature){

    //Add Popup system
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);

    //if we found a feature then create and show the popup.
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
}

/**********************************************************/
/*               End disable layers script                */
/**********************************************************/
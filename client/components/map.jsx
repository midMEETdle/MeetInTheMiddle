'use strict';
const React = require ('react');
const Reactdom = require('react-dom');
const Leaflet = require('react-leaflet');

/*  REACT-LEAFLET
*  is a react plugin that utilizes the leaflet js map library
*  It creates react wrapper components to allow for map rendering and
*  changing options that Leaflet allows
*
*
*/

const Map = React.createClass({

// creates the central coordinate array for the map
  parseArray: function () {
    var coordArray = [];
    coordArray.push(this.props.data.centralCoordinates.latitude);
    coordArray.push(this.props.data.centralCoordinates.longitude);

    return coordArray;

  },

// plotMarkers takes the props.data and creates markers with the location
// of each Restaurant and puts name and category when clicked

  plotMarkers: function () {
    var markers = [];
    var lat,lng;
    var infoObj = {};


    for(var i = 0; i < this.props.data.meetSuggestions.length; i++) {
      var locationObj = this.props.data.meetSuggestions[i];
      lat = locationObj.location.coordinate.latitude;
      lng = locationObj.location.coordinate.longitude;
      infoObj.name = locationObj.name;
      infoObj.phone = locationObj.phone;
      infoObj.category = locationObj.categories[0][0];


      markers.push(
          <Leaflet.Marker position={[lat,lng]}>
            <Leaflet.Popup>
              <span> {infoObj.name} <br/> {infoObj.category} </span>
            </Leaflet.Popup>
          </Leaflet.Marker>
      );
    }

    return markers;

  },

  render: function () {

    var coordinates = this.parseArray();
    var markers = this.plotMarkers();

    return (
      <Leaflet.Map center={coordinates} zoom={13}>
        <Leaflet.TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </Leaflet.Map>
    );
  },
});

//here is a basic set up of a leaflet marker with a pop-up

{/*<Leaflet.Marker position={coordinates}>
  <Leaflet.Popup>
    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
  </Leaflet.Popup>
</Leaflet.Marker>*/}





module.exports = Map;

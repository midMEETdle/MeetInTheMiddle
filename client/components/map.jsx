'use strict';
const React = require ('react');
const Reactdom = require('react-dom');
const Leaflet = require('react-leaflet');

const position = [51.505, -0.09];
const Map = React.createClass({

  parseArray: function () {
    var coordArray = [];
    coordArray.push(this.props.data.centralCoordinates.latitude);
    coordArray.push(this.props.data.centralCoordinates.longitude);

    return coordArray;

  },

  render: function () {
    var coordinates = this.parseArray();
    return (
      <Leaflet.Map center={coordinates} zoom={13}>
        <Leaflet.TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Leaflet.Marker position={coordinates}>
          <Leaflet.Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Leaflet.Popup>
        </Leaflet.Marker>
      </Leaflet.Map>    
    );
  },
});

module.exports = Map;

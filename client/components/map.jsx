'use strict';
const React = require ('react');
const Reactdom = require('react-dom');
const Leaflet = require('react-leaflet');

const position = [51.505, -0.09];
const map = (
  <Leaflet.Map center={position} zoom={13}>
    <Leaflet.TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Leaflet.Marker position={position}>
      <Leaflet.Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Leaflet.Popup>
    </Leaflet.Marker>
  </Leaflet.Map>
);

Reactdom.render(map , document.getElementById('app'));

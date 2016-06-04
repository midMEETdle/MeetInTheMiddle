'use strict';
const React = require ('react');
const Reactdom = require('react-dom');


let Map = React.createClass( {
  componentDidMount: () => {
    var mymap = L.map('mapid').setView([34,35], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
//loop through all locations and plot them on a map
    //  this.props.locations.forEach((coord ) => {
    //    L.marker([coord.lat, coord.lng]).addTo(mymap);
    //  });
    mymap.on('click', this.onMapClick);
  },
  render: () => {

    return ( <div id='mapid'></div>
    )
  }
});

var location = [{lat:34.1, lng:35.1}];

Reactdom.render(
  <Map />,
  document.getElementById('app')
);


module.exports = Map;

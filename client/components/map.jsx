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

    // data.forEach((coord ) => {
    //   console.log(coord.lat);
    //   console.log(coord.lng);
    //   L.marker([coord.lat, coord.lng]).addTo(mymap);
    // });
    //mymap.on('click', onMapClick);
  },
  render: () => {

    return ( <div></div>
    )
  }
});

Reactdom.render(
  <Map/>,
  document.getElementById('app')
);


module.exports = Map;

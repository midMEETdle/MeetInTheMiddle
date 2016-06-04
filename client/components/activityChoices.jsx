'use strict';
const React = require('react');

var ActivityChoices = React.createClass({

  render: function () {
    return (
      <label className="activities">
        <input type="checkbox" />
        <span className="label-body">{this.props.activity}</span>
      </label>
    );
  },

});

module.exports = ActivityChoices;

'use strict';
const React = require('react');

var ActivityChoice = React.createClass({

  render: function () {
    return (
      <label className="activities">
        <input type="checkbox" />
        <span className="label-body" value={this.props.activity}>{this.props.activity}</span>
      </label>
    );
  },

});

module.exports = ActivityChoice;

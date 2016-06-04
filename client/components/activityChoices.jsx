'use strict';
const React = require('react');

var ActivityChoice = React.createClass({

  render: function () {
    return (
      <div className="three columns">
        <label className="activities">
          <input name="activityBox" type="checkbox" value={this.props.activity} />
          <span className="label-body">{this.props.activity}</span>
        </label>
      </div>
    );
  },

});

module.exports = ActivityChoice;

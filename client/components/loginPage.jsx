'use strict';
const React = require('react');

var Login = React.createClass({

  render: function () {
    return (
      <form>
        <div className="six columns">       
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" />
        </div>

        <div className="six columns">       
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" />
        </div>

        <div className="six columns">      
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>

        <div className="six columns">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
      </form>
    );
  },

});

module.exports = Login;
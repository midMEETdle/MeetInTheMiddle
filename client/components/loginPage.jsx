'use strict';
const React = require('react');

var Login = React.createClass({

  render: function () {
    return (
      <form>
        <div className="row">
          <div className="three columns">       
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" />
          </div>

          <div className="three columns">       
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" />
          </div>

          <div className="three columns">      
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />
          </div>

          <div className="three columns">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
        </div>
      </form>
    );
  },

});

module.exports = Login;
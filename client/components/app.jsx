'use strict';
const React = require('react');
const ReactDom = require('react-dom');
const ActivityChoice = require('./activityChoices');
const AddressForm = require('./addressForm');
const MapResults = require('./map');

var App = React.createClass({

  getInitialState: function () {
    return ({
      numberOfPeople: 2,
      // TODO: Add state properties
    });
  },

  addForm: function (e) {
    // Will form content that was filled out before the button click be erased?
    // Set state with new number of people
    e.preventDefault();
    let formArray = [];
    for (let i = 0; i < this.state.numberOfPeople; i++) {
      formArray.push(<AddressForm id={i} />);
    }
    return formArray;
  },

  addActivities: function () {
    const activityTypes = ['Restaurants', 'Parks', 'Movie Theaters', 'Malls'];
    let activitiesArray = [];
    for (let i = 0, len = activitiesTypes.length; i < len; i++) {
      activitiesArray.push(<ActivityChoice activity={activityTypes[i]} />);
    }
    return activitiesArray;
  },

  submitInputData: function () {
    // Grab form data
    // Grab checkboxes
  },

  render: function () {

    // Friend address input intial render....
    var formFields = this.addForm();
    var activityCheckboxes = this.addActivities();
    return (
      {formFields}
      <button className="button-primary" onClick={this.addForm}>Add Address</button>
      <p>Find...</p>
      {activityCheckboxes}
      <button className="button-primary" onClick={this.submitInputData}>Meet in the middle!</button>
    );
  },

});

ReactDom.render(<App />, document.getElementById('app'));
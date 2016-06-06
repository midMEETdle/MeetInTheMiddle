'use strict';
const React = require('react');
const ReactDom = require('react-dom');
const ActivityChoice = require('./activityChoices.jsx');
const AddressForm = require('./addressForm.jsx');
const MapResults = require('./map.jsx');
const ResultList = require('./resultListItem.jsx');
const Login = require('./loginPage.jsx');
const $ = require('jquery');

var App = React.createClass({

  getInitialState: function () {
    return ({
      numberOfPeople: 2,
      currentPage: 'loginPage',
      resultsData: '',
    });
  },

  addForms: function () {
    let formArray = [];
    for (let i = 0; i < this.state.numberOfPeople; i++) {
      formArray.push(<AddressForm id={i} />);
    }
    return formArray;
  },

  addSingleForm: function (e) {
    e.preventDefault();
    const people = this.state.numberOfPeople + 1;
    this.setState({ numberOfPeople: people });
  },

  addActivities: function () {
    const activityTypes = ['Restaurant', 'Park', 'Movie Theater', 'Mall'];
    let activitiesArray = [];
    for (let i = 0, len = activityTypes.length; i < len; i++) {
      activitiesArray.push(<ActivityChoice activity={activityTypes[i]} />);
    }
    return activitiesArray;
  },

  formData: function() {
    // submiting ALL form data not just first one
    let formDataArray = [];
    for (let i = 0; i < this.state.numberOfPeople; i++) {
      var friendId = 'form #friend' + i;
      var streetId = 'form #street' + i;
      var cityId = 'form #city' + i;
      var stateId = 'form #state' + i;
      let personData = {};
      personData.name = $(friendId).val();
      personData.street = $(streetId).val();
      personData.city = $(cityId).val();
      personData.state = $(stateId).val();
      formDataArray.push(personData);
    }
    return formDataArray;
  },

  activityData: function () {
    let checkedBoxes = $('input[name="activityBox"]:checked');
    var checkedBoxesValues = [];
    for (var i = 0; i < checkedBoxes.length; i++) {
      checkedBoxesValues.push(checkedBoxes[i].value);
    }
    return checkedBoxesValues;
  },

  submitInputData: function () {
    let addressFormData = { inputArray: this.formData() };
    let checkedActivities = this.activityData();
    // Only posting addressFormData for now
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/meet',
      data: addressFormData,
      success: function (response) {
        console.log(response);
        let result = response;
        this.setState({
          resultsData: result,
          currentPage: 'resultsPage',
        });
      }.bind(this),
    });
  },

  userData: function() {
    var firstNameId = 'form #firstName';
    var lastNameId = 'form #lastName';
    var usernameId = 'form #username';
    var passwordId = 'form #password';
    let userData = {};
    userData.firstname = $(firstNameId).val();
    userData.lastname = $(lastNameId).val();
    userData.username = $(usernameId).val();
    userData.password = $(passwordId).val();
    return userData;
  },

  logInUser: function () {
    var userDataObj = { userData: this.userData() };
    console.log(userDataObj);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/createuser',
      data: userDataObj,
      success: function (response) {
        console.log('successful create user');
        this.setState({
          currentPage: 'addressesPage',
        });
      }.bind(this),
    });
  },

  render: function () {

    if (this.state.currentPage === 'addressesPage') {
      var formFields = this.addForms();
      var activityCheckboxes = this.addActivities();
      return (
        <div>
          {formFields}
          <button className="button-primary" onClick={this.addSingleForm}>Add Address</button>
          <h4>Where do you want to meet?</h4>
          <div className="row">
            {activityCheckboxes}
          </div>
          <button className="button-primary" onClick={this.submitInputData}>Meet in the middle!</button>
        </div>
      );
    }

    if (this.state.currentPage === 'resultsPage') {
      return (
        <div>
          <MapResults data={this.state.resultsData} />
          <ResultList data={this.state.resultsData} />
        </div>
      );
    }

    if (this.state.currentPage === 'loginPage') {
      return (
        <div>
          <Login />
          <button className="button-primary" onClick={this.logInUser}>Sign Up</button>
        </div>
      );
    }
  },

});

ReactDom.render(<App />, document.getElementById('app'));

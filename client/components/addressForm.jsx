'use strict';
const React = require('react');

var AddressForm = React.createClass({

  render: function () {
    return (
      <form>
        <label htmlFor={"friend" + this.props.id}>Name:</label>
        <input type="text" className="friendName" placeholder="Name" id={"friend" + this.props.id} />

        <label htmlFor={"street" + this.props.id}>Street:</label>
        <input type="text" className="streetName" placeholder="Street (i.e 123 Main Street)" id={"street" + this.props.id} />

        <label htmlFor={"city" + this.props.id}>City:</label>
        <input type="text" className="cityName" placeholder="City" id={"city" + this.props.id} />

        <label htmlFor={"state" + this.props.id}>State:</label>
        <input type="text" className="stateName" placeholder="State" id={"state" + this.props.id} />
      </form>
    );
  },

});

module.exports = AddressForm;

'use strict';
const React = require('react');

var AddressForm = React.createClass({

  render: function () {
    return (
      <form>
        <label htmlFor={"friend" + this.props.id}>FRIEND ONE</label>
        <input type="text" className="friendName" placeholder="Name" id={"friend" + this.props.id} />

        <label htmlFor={"street" + this.props.id}>STREET ONE</label>
        <input type="text" className="streetName" placeholder="Street (i.e 123 Main Street)" id={"street" + this.props.id} />

        <label htmlFor={"city" + this.props.id}>CITY ONE</label>
        <input type="text" className="cityName" placeholder="City" id={"city" + this.props.id} />

        <label htmlFor={"state" + this.props.id}>STATE ONE</label>
        <input type="text" className="stateName" placeholder="State" id={"state" + this.props.id} />
      </form>
    );
  },

});

module.exports = AddressForm;

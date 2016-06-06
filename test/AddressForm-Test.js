'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import AddressForm from '../client/components/addressForm';




describe('React unit tests: AddressForm', () => {


  it('should have className row', function() {
    expect(shallow(<AddressForm />).is('.row')).to.equal(true);
  });
  it('should have className three columns', function() {
    expect(mount(<AddressForm />).children().find('.three').length).to.equal(4);
  });

  it('should have className cityName', function() {
    expect(mount(<AddressForm />).children().find('.cityName').length).to.equal(1);
  })

});

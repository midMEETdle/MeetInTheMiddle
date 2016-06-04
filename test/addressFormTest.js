'use strict';

const React = require('react');
const Chai = require('chai');
const expect = Chai.expect;
const sd = require('skin-deep');
const AddressForm = require('./../client/components/addressForm');

describe('React unit tests: AddressForm', () => {
  let tree;
  let instance;
  let vdom;

  beforeEach(function () {
    tree = sd.shallowRender(<AddressForm id="1" />);
  });

  // instance = tree.getMountedInstance();
  // vdom = tree.getRenderOutput();

  it('Renders a form', () => {
    expect(tree.type).toEqual('form');
  });
});

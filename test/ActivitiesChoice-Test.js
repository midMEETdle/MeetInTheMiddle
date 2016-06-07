'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ActivityChoice from '../client/components/activityChoices';


describe('ActivityChoice Component', function() {

  it('should have className three columns', function() {
    expect(shallow(<ActivityChoice />).is('.three')).to.equal(true);
  });

  it('should have child tag label', function() {
    expect(shallow(<ActivityChoice />).children('label').length).to.equal(1);
  });

  it('should have 2 child elements for label element: 1 span, 1 input', function() {
    const labelNode = shallow(<ActivityChoice />).find('label');
    expect(labelNode.children().length).to.equal(2);
    expect(labelNode.children('input').length).to.equal(1);
    expect(labelNode.children('span').length).to.equal(1);
  });

  it('should have label children values equal to property value', function() {
    const labelNode = mount(<ActivityChoice activity={'testActivity'} />).find('label');
    const inputNode = labelNode.find('input');
    expect(inputNode.prop('value')).to.equal('testActivity');
    const spanNode = labelNode.find('span');
    expect(spanNode.text()).to.equal('testActivity');
  });
})

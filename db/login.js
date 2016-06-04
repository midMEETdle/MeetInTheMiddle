'use strict';
const request = require('request');
let databaseOps = require('./database');

//Create User
request(USER REQUEST ROUTE, (err, resp) => {
  let userData = JSON.parse(resp.body);
  databaseOps.createUser(userData);
});

request(ADDRESS REQ ROUTE, (err, resp) => {
  let addressData = JSON.parse(resp.body);
  databaseOps.createAddress(addressData);
})

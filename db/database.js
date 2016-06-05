'use strict';
const pg = require('pg').native;
const Sequelize = require('sequelize');
const request = require('request');
const bcrypt = require('bcryptjs');
const SALT_VALUE = 10;
const privateKeys = require('./../privateKeys.js');

//instantiates and logs in to the postgreSQL database on heroku
const sequelize = new Sequelize(privateKeys.postgresURI, {
  native: true,
  ssl: true,
  dialect: 'postgres',
});

const databaseOps = {
  // sets up the user model in the database
  usersModel: sequelize.define('users', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: Sequelize.STRING, allowNull: false},
    lastname: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {notEmpty: true}},
    password: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  },
  //set up the hook (like when we authenticated in mongo using pre 'save') to bcrypt the password before every user is made;
  { hooks: {
    beforeCreate: (user) => {
      user.password = bcrypt.hashSync(user.password, SALT_VALUE);
      }
    },
  }),

  // creates a user in the database
  createUser: (req, res, next) => {
    let Users = databaseOps.usersModel;
    //establish connection with database and prepare to add new user
    let usersTablePromise = Users.sync({ logging: console.log, force: true });
    usersTablePromise.then(() => {
    	// userData is being passed via the request body
      Users.create(req.body.userData)
      .then((databaseResponse) => {
        //when we get a response from the database we will pass that back to the front end to prove a successful database save
        //TODO: add error handling
        req.body.databaseResponse = JSON.stringify(databaseResponse);
        next();
      });
    });
  },
  //TODO: write the function to receive the user input from the login screen and compare against the password and username stored in the database
  verifyUser: (req, res, next) => {
    // user login verification details will come in on the req body
    // think about bcrypt.compareSync(myPlaintextPassword, hash); // true
  },
// sets up the address model for the database
  addressesModel: sequelize.define('addresses', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    street: {type: Sequelize.STRING, allowNull: false},
    city: {type: Sequelize.STRING, allowNull: false},
    state: {type: Sequelize.STRING, allowNull: false},
    // TODO:add a column for userID to store the link
  }),
  // addressData is passed via the request body
  createAddress: (req, res, next) => {
    let Addresses = databaseOps.addressesModel;

    //set up that one user can have multiple addresses
    // TODO: Need to add an element to the client that identified the user
    //Addresses.belongsTo(databaseOps.usersModel);

    //establishes connection with database and prepare to add new addresses
    let addressesTablePromise = Addresses.sync({ logging: console.log, force: true });

    addressesTablePromise.then(() => {
      // Addresses.bulkCreate(addressData);
      Addresses.bulkCreate(req.body.addressData)
      .then((databaseResponse) => {
        //when we get a response from the database we will pass that back to the front end to prove a successful database save
        //TODO: add error handling
        req.body.databaseResponse = JSON.stringify(databaseResponse);
        next();
      });
    });
  },
};

module.exports = databaseOps;

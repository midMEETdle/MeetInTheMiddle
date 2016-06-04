'use strict';
const pg = require('pg').native;
const Sequelize = require('sequelize');
const request = require('request');
const bcrypt = require('bcryptjs');
const SALT_VALUE = 10;

const sequelize = new Sequelize('postgres://usewxxncwyaejx:tZJCuwYOCU0QArl3JUv9_gyE-n@ec2-23-21-164-237.compute-1.amazonaws.com:5432/d4imhd4libvku4', {
  native: true,
  ssl: true,
  dialect: 'postgres',
});

const databaseOps = {
//userData -- add this back as a parameter

  usersModel: sequelize.define('users', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: Sequelize.STRING, allowNull: false},
    lastname: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {notEmpty: true}},
    password: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  },
  //set up the hook (like when we authenticated in mongo using pre 'save') to bcrypt the password before every user is made;
  { hooks: {
    beforeCreate: (user, fn) => {
      var salt = bcrypt.genSalt(SALT_VALUE, function(err, salt){
        return salt;
      });
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) throw new Error(err);
        user.password = hash;
        return fn(null, user);
      });
    }
    },
  }),

  createUser: () => {
    let Users = databaseOps.usersModel;
    //establish connection with database and prepare to add new user
    let usersTablePromise = Users.sync({ logging: console.log, force: true });
    usersTablePromise.then(() => {
    	//Users.create(userData);
      Users.create(
        {
          firstname: 'Michael',
          lastname: 'Blanchard',
          username: 'miblanchard',
          password: 'michael',
        });
        console.log('created user');
    });
  },

  addressesModel: sequelize.define('addresses', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    street: {type: Sequelize.STRING, allowNull: false},
    city: {type: Sequelize.STRING, allowNull: false},
    state: {type: Sequelize.STRING, allowNull: false},
  }),
//addressData -- add back to parameter
  createAddress: () => {
    let Addresses = databaseOps.addressesModel;
    //set up that one user can have multiple addresses
    Addresses.belongsTo(databaseOps.usersModel);
    //establish connection with database and prepare to add new addresses
    let addressesTablePromise = Addresses.sync({ logging: console.log, force: true });

    addressesTablePromise.then(() => {
      // Addresses.bulkCreate(addressData);
      Addresses.bulkCreate([{name: 'home', street: '825 7th St', city: 'Hermosa Beach', state: 'CA'},{name: 'work', street: '5300 Beethoven St', city: 'Los Angeles', state: 'CA'}]);
      console.log('created Address');
    });
  },
};

databaseOps.createUser();
databaseOps.createAddress();

module.exports = databaseOps;

// function parseUserData(userData) {
//   let parsedUserData = {};
//   for (let trait in userData){
//     parseUserData[trait] = userData[trait];
//   }
//   return parsedUserData;
// }

// function parseAddressData(addressData) {
// 	let parsedAddressData = {};
//   for (let trait in addressesData){
//     parseAddressData[trait] = addressData[trait];
//   }
// 	return parsedAddressData;
// }

// function parseAddressData(addressData) {
// 	const parsedAddressData = [];
// 	addresses.forEach(address => {
// 		const  = data[date];
// 		events.forEach(event => {
// 			const addrObj = {
// 				street: event.summary,
// 				city: event.htmlLink,
// 				state: event.sequence,
// 				name: new Date(event.created),
// 			};
// 			parsedData.push(addrObj);
// 		});
// 	});
// 	return parsedAddressData;
// }

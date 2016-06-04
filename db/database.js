'use strict';
const pg = require('pg');
const Sequelize = require('sequelize');
const request = require('request');

const sequelize = new Sequelize('postgres://usewxxncwyaejx:tZJCuwYOCU0QArl3JUv9_gyE-n@ec2-23-21-164-237.compute-1.amazonaws.com:5432/d4imhd4libvku4', {
  native: true,
  dialect: 'postgres',
});

const databaseOps = {

  createUser: (userData) => {
    let Users = sequelize.define('users', {
      _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {type: Sequelize.STRING},
      lastName: {type: Sequelize.STRING},
      username: {type: Sequelize.STRING},
      password: {type: Sequelize.STRING},
    });
    //establish connection with database and prepare to add new user
    let usersTablePromise = Users.sync({ logging: console.log, force: true });
    usersTablePromise.then(() => {
    	Users.create(userData);
    });
    // function parseUserData(userData) {
    //   let parsedUserData = {};
    //   for (let trait in userData){
    //     parseUserData[trait] = userData[trait];
    //   }
    //   return parsedUserData;
    // }
  },

  createAddress: (addressData) => {
    let Addresses = sequelize.define('addresses', {
      _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      street: {type: Sequelize.STRING},
      city: {type: Sequelize.STRING},
      state: {type: Sequelize.STRING},
      name: {type: Sequelize.STRING},
    });
    //set up that one user can have multiple addresses
    Addresses.belongsTo(Users);
    //establish connection with database and prepare to add new addresses
    let addressesTablePromise = Addresses.sync({ logging: console.log, force: true });

    addressesTablePromise.then(() => {
      Addresses.bulkCreate(addressData);
    });
  },
};

module.exports = databaseOps;

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

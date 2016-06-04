'use strict';
const pg = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://usewxxncwyaejx:tZJCuwYOCU0QArl3JUv9_gyE-n@ec2-23-21-164-237.compute-1.amazonaws.com:5432/d4imhd4libvku4', {
  native: true,
  dialect: 'postgres',
});

let User = sequelize.define('user', {
	_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstName: {type: Sequelize.STRING},
	lastName: {type: Sequelize.STRING},
	username: {type: Sequelize.STRING},
	password: {type: Sequelize.STRING},
	addresses: {type: Sequelize.DATE},
});

let userTablePromise = User.sync({ logging: console.log, force: true });

module.exports = function(data) {
  userTablePromise.then(() => {
  	User.bulkCreate(parseData(data));
  });
};

function parseData(data) {
	const parsedData = [];
	const dates = Object.keys(data);
	dates.forEach(date => {
		const events = data[date];
		events.forEach(event => {
			const evtObj = {
				id: event.id,
				summary: event.summary,
				htmlLink: event.htmlLink,
				sequence: event.sequence,
				created: new Date(event.created),
				updated: new Date(event.updated),
				start: new Date(event.start.dateTime),
				end: new Date(event.end.dateTime),
			};
			parsedData.push(evtObj);
		});
	});
	return parsedData;
}

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

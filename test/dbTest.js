// Here we will be unit testing the 3 database functions from server/db/games.js
const db = require('../db/database.js');
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;

describe('database', function() {
  var db;
  before(function(done) {
    var uri = 'postgres://usewxxncwyaejx:tZJCuwYOCU0QArl3JUv9_gyE-n@ec2-23-21-164-237.compute-1.amazonaws.com:5432/d4imhd4libvku4';
    pg.connect(uri, function(err, db_) {
      if (err) throw new Error(err);
      db = db_;
      done();
    });
  });

  it('should have "users" table', function(done) {
    let doesTableExist = `
      SELECT EXISTS (
         SELECT 1
         FROM   information_schema.tables
         WHERE  table_name = 'users'
      );`;
    db.query(doesTableExist, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows[0].exists).to.eql(true);
      done();
    });
  });

  it('should have "addresses" table', function(done) {
    let doesTableExist = `
      SELECT EXISTS (
         SELECT 1
         FROM   information_schema.tables
         WHERE  table_name = 'addresses'
      );`;
    db.query(doesTableExist, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows[0].exists).to.eql(true);
      done();
    });
  });

  it('users table should have correct columns', function(done) {
    let columnNames = `
      SELECT *
      FROM information_schema.columns
      WHERE table_name = 'users'
    `;
    db.query(columnNames, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows).to.have.length.above(0);
      var columnNames = result.rows.map(column => column.column_name);
      var schemaNames = Object.keys(types);
      // check the column names
      expect(columnNames).to.include.members(schemaNames);
      // check their types
      result.rows.forEach(function(column) {
        expect(column.column_name).to.be.a('string');
        if (types[column.column_name]) {
          expect(column.data_type).to.match(types[column.column_name]);
        }
      });
      done();
    });
  });

  it('addresses table should have correct columns', function(done) {
    let columnNames = `
      SELECT *
      FROM information_schema.columns
      WHERE table_name = 'addresses'
    `;
    db.query(columnNames, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows).to.have.length.above(0);
      var columnNames = result.rows.map(column => column.column_name);
      var schemaNames = Object.keys(types);
      // check the column names
      expect(columnNames).to.include.members(schemaNames);
      // check their types
      result.rows.forEach(function(column) {
        expect(column.column_name).to.be.a('string');
        if (types[column.column_name]) {
          expect(column.data_type).to.match(types[column.column_name]);
        }
      });
      done();
    });
  });

  it('users should be in the table ', function(done) {
    var userCount = 'SELECT COUNT(*) FROM users;';
    db.query(userCount, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows[0].count).to.be.above(10);
      done();
    });
  });

  it('addresses should be in the table ', function(done) {
    var addressCount = 'SELECT COUNT(*) FROM addresses;';
    db.query(addressCount, function(err, result) {
      expect(err).to.not.exist;
      expect(result.rows[0].count).to.be.above(10);
      done();
    });
  });

  it('should have the colums filled in for users', function(done) {
    var selectAll = 'SELECT * FROM users';
    db.query(selectAll, function(err, result) {
      expect(err).to.not.exist;
      var user = result.rows[2];
      expect(user.firstName).to.be.a('string').and.not.eql('');
      expect(user.lastName).to.be.a('string').and.not.eql('');
      expect(user.username).to.be.a('string').and.not.eql('');
      expect(user.password).to.be.a('string').and.not.eql('');
      done();
    });
  });

  it('should have the colums filled in for addresses', function(done) {
    var selectAll = 'SELECT * FROM addresses';
    db.query(selectAll, function(err, result) {
      expect(err).to.not.exist;
      var address = result.rows[2];
      expect(address.street).to.be.a('string').and.not.eql('');
      expect(address.city).to.be.a('string').and.not.eql('');
      expect(address.state).to.be.a('string').and.not.eql('');
      done();
    });
  });

  after(function() {
    db.end();
  });
});

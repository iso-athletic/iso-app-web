const words = require('./words.js')

const express = require('express')
const app = express()
var pg = require('pg')
var format = require('pg-format')
var PGUSER = words.DBUSER()
var PGHOST = words.DBHOST()
var PGDB = words.DBNAME();
var PASS = words.DBPASS();
var PORT = words.DBPORT();

var pool = new pg.Pool({
    user: PGUSER, // name of the user account
    host: PGHOST, // name of host
    database: PGDB, // name of the database
    password: PASS, // password
    port: PORT,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
})

var myClient;
var testMessage = 'hello world 5';

pool.connect(function (err, client, done) {
  if (err) console.log(err);
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
  myClient = client
  var testQuery = format('INSERT INTO users (name, role_id, organization_id) VALUES (%L,%L,%L)', 'Joe Cummings', 1,1);
  myClient.query(testQuery, function (err, result) {
    if (err) {
        console.log(err);
    }});
});

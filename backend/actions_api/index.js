console.log("PostgreSQL GET Function");
var pg = require("pg");
exports.handler = function(event, context) {
  var conn = "postgres://master:isoisobaby@iso-dev.cja3aizuyply.us-east-1.rds.amazonaws.com:1599/iso_dev";
  var client = new pg.Client(conn);
  client.connect();
  //var id = event.id;
  console.log("Connected to PostgreSQL database");
  var query = client.query("SELECT * from users;");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    var jsonString = JSON.stringify(result.rows);
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonString);
    client.end();
    context.succeed(jsonObj);
  });
};

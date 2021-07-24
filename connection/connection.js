const db        = require('mysql');

let con = db.createConnection({
    host: "localhost",
    user: "root",
    database: "fitnesspal",
    password: ""
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySql!");
  });


  module.exports = con;
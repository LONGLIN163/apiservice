/**********config for heroku********** */
// const mysql = require("mysql");
// const dbConfig = require("./config/db.config.js");
// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

/**********config for aws********** */
const mysql = require("mysql");
const dbConfig = require("./config/db.config.js");
var connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

console.log(dbConfig)

connection.connect((err) => {
  if (err) {
      console.log(err.message);
      return;
  } 
      console.log('Connected to database')
});

module.exports = connection;

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be01279bf6aec6',
    password: 'c8ffeb4d',
    database: 'heroku_058e3975255d597'
  });

// const db = mysql.createConnection({
//     host: 'localhost',
//     port: '3308',
//     user: 'root',
//     password: '123456',
//     database: 'react_blog'
//   });

module.exports=db;
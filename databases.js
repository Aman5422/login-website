const mysql = require("mysql")


// database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aman1234",
    database: "test",
    connectionLimit: 10
})
connection.connect(function(err){
    if (err) throw err;
    console.log("connected1..")
})

module.exports = connection;


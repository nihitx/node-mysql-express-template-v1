var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1', // Your host - either local or cloud
    user     : 'root', // your username
    password : 'root', // your password
    database : 'your-db-name' // database name
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;

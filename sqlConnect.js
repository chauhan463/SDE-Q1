const mysql = require('mysql');

// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arjun211@",
    database: "LibraryDB"
});

// open the MySQL connection
const sqlConnect = () => {
    connection.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the MySQL database.");
    });
}


module.exports = { connection, sqlConnect };
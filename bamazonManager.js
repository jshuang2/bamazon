var mysql = require("mysql");
// var inquirer = require("inquirer");

var db = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "schumacher1",
    database: "bamazon_db"
});

db.connect(function (err) {
    if (err) throw (err);
    console.log("Connection successful.");
});


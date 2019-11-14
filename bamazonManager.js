var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("\n");
    menu();
});

function menu () {
    inquirer
    .prompt({
        name: "menu",
        type: "rawlist",
        message: "Hello. What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    })
    .then(function(answer) {
        switch (answer.menu) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add Product":
                addProduct();
                break;
            default:
                console.log("Invalid selection.");
                menu();
        }
    })
}

function viewProducts() {
    var query = "SELECT * FROM products";
    db.query(query, function(err, res) {
        console.log("\n");
        console.log("ALL PRODUCTS");
        for (var i = 0; i < res.length; i++) {
            console.log("----------------------------------");
            console.log("Item ID: " + res[i].item_id + "\nProduct name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nStock quantity: " + res[i].stock_quantity);
        }
        console.log("\n==================================");
    })
};


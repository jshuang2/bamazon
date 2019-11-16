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
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
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
        whatNext();
    })
};

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    db.query(query, function(err, res) {
        console.log("\n");
        console.log("LOW INVENTORY");
        for (var i = 0; i < res.length; i++) {
            console.log("----------------------------------");
            console.log("Item ID: " + res[i].item_id + "\nProduct name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nStock quantity: " + res[i].stock_quantity);
        }
        console.log("\n==================================");
        whatNext();
    })
};

function addInventory() {
    var query = "SELECT * FROM products";
    db.query(query, function(err, res) {
        console.log("\n");
        console.log("ALL PRODUCTS");
        for (var i = 0; i < res.length; i++) {
            console.log("----------------------------------");
            console.log("Item ID: " + res[i].item_id + "\nProduct name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nStock quantity: " + res[i].stock_quantity);
        }
        console.log("\n==================================");
    

        inquirer
        .prompt([{
            name: "selectProduct",
            type: "input",
            message: "What's the ID of the item you would like to add inventory to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
            },
            {
            name: "addHowMany",
            type: "input",
            message: "How many units would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
            }
        ])
        .then(function(answer) {
            var newQuantity;
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseFloat(answer.selectProduct)) {
                    newQuantity = res[i].stock_quantity + parseFloat(answer.addHowMany);
                    chosenItem = res[i].product_name;

                    db.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: answer.selectProduct}], function(err) {
                        if (err) throw err;
                        console.log("------------------------------------------------");
                        console.log("Inventory successfully added! \nThe total available quantity of " + chosenItem + " is now " + newQuantity + " units.");
                        console.log("------------------------------------------------");
                        whatNext();
                    })
                }
            }
        })
    
    });
}

function addProduct () {
    inquirer
    .prompt([{
            name: "productName",
            type: "input",
            message: "What's the new product called?"
        },
        {
            name: "departmentName",
            type: "input",
            message: "What department does this product belong in?"
        },
        {
            name: "productPrice",
            type: "input",
            message: "What do you want to set the price to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
        },
        {
            name: "productQuantity",
            type: "input",
            message: "How many units of this product do we have to sell?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
        }
    ])
    .then(function(answer) {
        db.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.productName,
                department_name: answer.departmentName,
                price: answer.productPrice,
                stock_quantity: answer.productQuantity
            },
            function(err) {
                if (err) throw err;
                console.log("------------------------------------------------");
                console.log("New product successfully added! \nThe total available quantity of " + answer.productName + " is " + answer.productQuantity + " unit(s). It costs $" + answer.productPrice + " each.");
                console.log("------------------------------------------------");
                whatNext();
            }
        )
    })
}

function whatNext () {
        inquirer
        .prompt({
            name: "whatNext",
            type: "rawlist",
            message: "What would you like to do next?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.whatNext) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
                    console.log("Invalid selection.");
                    whatNext();
            }
        })
};
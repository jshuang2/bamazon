var mysql = require("mysql");
var inquirer = require("inquirer");

var db = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "schumacher1",
    database: "bamazon_db"
});

db.connect(function(err) {
    if (err) throw (err);
    console.log("Connection successful.");
    runBamazon();
});

function runBamazon () {
    var query = "SELECT item_id, product_name, price FROM products";
    db.query(query, function(err, res) {
        console.log("==================================" + "\n");
        console.log("ITEMS FOR SALE");
        for (var i = 0; i < res.length; i++) {
            console.log("----------------------------------");
            console.log(
                "Item ID: " + res[i].item_id + "\nProduct name: " + res[i].product_name + "\nPrice: $" + res[i].price
            );
        }
        console.log("\n" + "==================================");
        runInquirer();
    });
};
    
function runInquirer() {
    db.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    
    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "What's the ID of the item you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "howManyUnits",
            type: "input",
            message: "How many units of the item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        ])
        .then(function(answer) {
            var newItemQuantity;
            var cost;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseFloat(answer.itemID) && res[i].stock_quantity >= parseFloat(answer.howManyUnits)) {
                   newItemQuantity = res[i].stock_quantity - answer.howManyUnits;
                   cost = answer.howManyUnits * res[i].price;

                   db.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newItemQuantity}, {item_id: answer.itemID}], function(err) {
                       if (err) throw err;
                       console.log("------------------------------------------------");
                       console.log("Purchase successful! You've bought " + answer.howManyUnits + " unit(s). \nThe total cost was: $" + cost + ".");
                       console.log("------------------------------------------------");
                       runInquirer();
                   })
                }
                else if (res[i].item_id === parseFloat(answer.itemID) && res[i].stock_quantity < parseFloat(answer.howManyUnits)) {
                    console.log("------------------------------------------------");
                    console.log("Insufficient quantity!");
                    console.log("------------------------------------------------");
                    runInquirer();
                }
            }
            
        });

    })
};



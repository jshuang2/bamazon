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
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseFloat(answer.itemID) && res[i].stock_quantity >= parseFloat(answer.howManyUnits)) {
                   newItemQuantity = res[i].stock_quantity - answer.howManyUnits;
                }
            }
            console.log(newItemQuantity);
        //     if (newItemQuantity >= parseFloat(answer.itemID) {
        //         newItemQuantity 
        //     })
        // })
        })
    })
};


// function updateBamazon() {
//     var query = "UPDATE products SET stock_quantity = ?"
// }
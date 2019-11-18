# bamazon
This is a Node.js and MySQL app that simulates basic functionality of an online web store. Store inventory data is stored in a MySQL database and is referenced accordingly via user input.

## What can it do?

1. **Customer View** - Upon opening the customer interface within the CLI using the command `node bamazonCustomer.js`, customers are able to immediately view all of the available products in the store. <br><br>Customers are then able to make a purchase by inputting their desired amount of units for a specific item ID #. However, if there is not enough available inventory of the item to satisfy the purchase, the app will block the order from completing.

![bamazonCustomer-gif](https://user-images.githubusercontent.com/52802240/69092406-27f78780-0a01-11ea-914d-adfa8c49ab93.gif)

2. **Manager View** - Managers can access the manager interface by typing the command `node bamazonManager.js` into the CLI. Running this application will list a set of menu options:
    * View Products for Sale
        * The app will list every available item as well as their respective item IDs, names, prices, and quantities.
    * View Low Inventory
        * The app will list all items with an inventory count lower than five.
    * Add to Inventory
         * The app will display a prompt that will let them "add more" of any item currently in the store.
    * Add New Product
        * The app will allow the them to add a completely new product to the store.







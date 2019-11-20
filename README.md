# bamazon
This is a Node.js and MySQL app that simulates basic functionality of an online web store. Store inventory data is stored in a MySQL database and is referenced accordingly via user input.

## MySQL Database
This app utilizes a locally run MySQL database called **bamazon_db**. Within this database, a table called **products** holds information on every product in the bamazon inventory. The unique primary key is called `item_id` and is auto-incremented by one after each entry. New entries can be dynamically added via user input in the CLI. Below is a screenshot of the table.<br><br>
<img width="600" src="https://user-images.githubusercontent.com/52802240/69197388-0c19e180-0ae6-11ea-9959-502ea5e28a99.PNG">

## What can it do?

1. **Customer View** - Upon opening the customer interface within the CLI using the command `node bamazonCustomer.js`, customers are able to immediately view all of the available products in the store. <br><br>Customers are then able to make a purchase by inputting their desired amount of units for a specific item ID #. However, if there is not enough available inventory of the item to satisfy the purchase, the app will block the order from completing.

![bamazonCustomer-gif](https://user-images.githubusercontent.com/52802240/69092406-27f78780-0a01-11ea-914d-adfa8c49ab93.gif)

2. **Manager View** - Managers can access the manager interface by typing the command `node bamazonManager.js` into the CLI. Running this application will list a set of menu options:
    * View Products for Sale
        * The app will list every available item as well as their respective item IDs, names, prices, and quantities.
        ![bamazonViewProductsGif](https://user-images.githubusercontent.com/52802240/69194689-9f4f1900-0ade-11ea-86b9-154c5b159771.gif)
    * View Low Inventory
        * The app will list all items with an inventory count lower than five.<br>
        ![bamazonViewLowInventoryGif](https://user-images.githubusercontent.com/52802240/69195341-3799cd80-0ae0-11ea-9a2e-8f648ea95c71.gif)
    * Add to Inventory
         * The app will display a prompt that will let them "add more" of any item currently in the store.
         ![bamazonAddInventoryGif](https://user-images.githubusercontent.com/52802240/69195858-b80cfe00-0ae1-11ea-85e7-75d5d8dd29b4.gif)
    * Add New Product
        * The app will allow the them to add a completely new product to the store.<br>
        ![bamazonAddProductGif](https://user-images.githubusercontent.com/52802240/69196394-37e79800-0ae3-11ea-8a40-c05228a1428a.gif)







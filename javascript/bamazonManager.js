var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    
    port:3306,
    
    user:"root",
    
    password: "Digambara11$$",
    database: "bamazon"
    });
    
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected as "+connection.threadId);
        ask();
        
    });

    function ask(){
        inquirer.prompt([
            {
                name:"options",
                type:"list",
                choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
            }
        ]).then(function(response){
            if(response.options==="View Products for Sale"){
                viewProducts();
            }
            else if(response.options==="View Low Inventory"){
                viewLowInventory();
            }
            else if(response.options==="Add to Inventory"){
                addToInventory();
            }
            else if(response.options==="Add New Product"){
                addNewProduct();
            }
        });
        
    }



function viewProducts(){
    connection.query("SELECT * from products", function(err,response){
        if(err) throw err;
        console.table(response);
        connection.end();
    })
}

function viewLowInventory(){
    connection.query("SELECT * from products WHERE stock_quantity<?",[5], function(err,response){
        if(err) throw err;
        console.table(response);
        connection.end();
    })
}

function addToInventory(){
    inquirer.prompt([
        {
            name:"askId",
            message:"What is the Id of the product?",
            type:"number"
        },
        {
            name:"askQuant",
            message:"How much quantity you want to add?",
            type:"number"
        }
    ]).then(function(response){
        var addQuantity= response.askQuant;
        var item_id = parseInt(response.askId);
        connection.query("SELECT stock_quantity from products WHERE item_id=?",[item_id],function(err,resp){
            if(err) throw err;
            var stock_quantity = resp[0].stock_quantity+addQuantity;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity:stock_quantity
                    },
                    {
                        item_id:item_id
                    }
                ],
                function(err,resp){
                    if(err) throw err;
                    console.log("Added");
                }
            );
            connection.end();
        });
    })
}

function addNewProduct(){
    inquirer.prompt([
        {
            name:"askName",
            message:"Name of Product:",
            type:"input"
        },
        {
            name:"askDept",
            message:"Department of product:",
            type:"input"
        },
        {
            name:"askPrice",
            message:"Price of the Product:",
            type:"number"
        },
        {
            name:"askQuant",
            message:"Quantity of the Product",
            type:"number"
        }
    ]).then(function(response){
        var product_name = response.askName;
        var department_name = response.askDept;
        var price = response.askPrice;
        var stock_quantity=response.askQuant;

        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name:product_name,
                department_name:department_name,
                price:price,
                stock_quantity:stock_quantity
            },
            function(err,resp){
                if(err) throw err;
                console.log(resp);
                connection.end();
            }
        );
    })
}
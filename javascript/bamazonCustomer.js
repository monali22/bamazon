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
    showProducts();
    
});

function showProducts(){
    connection.query("SELECT item_id,product_name,price from products", function(err,response){
        if(err) throw err;
        for(var i=0;i<response.length;i++){
            console.log(response[i].item_id+" "+response[i].product_name+" "+response[i].price);
            console.log("-------------------------------------");
            
        }

        inquirer.prompt([
            {
                name:"buyWhatId",
                message:"What is id of the item you want to buy?",
                type:"number"
            },
            {
                name:"howMuch",
                message:"How much you want to buy?",
                type:"number"
            }
        ]).then(function(response){
           buyTheProduct(response.buyWhatId,response.howMuch);

        })
        
    })
}

function buyTheProduct(item_id,quantity){
    item_id=parseInt(item_id);
    quantity=parseInt(quantity);
    var query = connection.query("SELECT stock_quantity,price,product_sales from products WHERE item_id=?",[item_id],function(err,resp){
        if(err) throw err;
        //console.log(resp[0].stock_quantity);
       var price=resp[0].price;
       var sales=resp[0].product_sales;
        if(resp[0].stock_quantity>quantity){
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity:resp[0].stock_quantity-quantity
                    },
                    {
                        item_id:item_id
                    }
                ]
            ,function(err,resp){
                if (err) throw err;
                console.log("You Total Bill is "+quantity*price);
               
            });

           
                    connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            product_sales:sales+(quantity*price)
                        },
                        {
                            item_id:item_id
                        }
                    ],
                    function(err,resp){
                        if(err) throw err;
                        //console.log(resp);
                    }
                    );
         
            
        }
        else{
            console.log("Insufficient quantity!");
        }
        connection.end();
    });
    
}





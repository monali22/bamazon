var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Digambara11$$",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as " + connection.threadId);
    ask();

});
function ask() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (response) {
        console.log(response.options);
        switch (response.options) {
            case "View Product Sales by Department": viewSales();
                break;
            case "Create New Department": createNewDept();
                break;
        }
    });
}


function viewSales() {
    connection.query(
        "SELECT departments.department_id,departments.department_name,departments.over_head_costs,products.product_sales,products.product_sales-departments.over_head_costs as Profit FROM departments INNER JOIN products WHERE departments.department_name=products.department_name",
        function (err, resp) {
            if (err) throw err;
            console.table(resp);
        }
    );


    connection.end();
}

function createNewDept(){

    inquirer.prompt([
        {
            name:"dept_id",
            message:"What is the department id?"
        },
        {
            name:"dept_name",
            message:"What is department name?"
        }
    ]).then(function(resp){
    var dept_id=resp.dept_id;
    var dept_name=resp.dept_name;

    connection.query(
        "INSERT INTO departments SET ?",
        {
            department_id:dept_id,
            department_name:dept_name,
            over_head_costs:0
        },
        function(err,resp){
            if(err) throw err;
            console.log("Department Added");
        }
    );

    connection.end();

    });
}
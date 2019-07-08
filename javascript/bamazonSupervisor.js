var inquirer = require("inquirer");

inquirer.prompt([
    {
        name:"options",
        type:"list",
        choices:["View Product Sales by Department","Create New Department"]
    }
]).then(function(response){
    console.log(response.options);
    switch(response.options){
        case "View Product Sales by Department": viewSales();
                                                 break;
        case  "Create New Department"          : createNewDept();
                                                 break;
    }
});

function viewSales(){
    
}
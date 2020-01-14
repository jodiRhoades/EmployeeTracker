var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "jojo2448",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);  
  start();
});
    
function start() {
    inquirer
      .prompt({
        name: "editORview",
        type: "list",
        message: "Would you like to [ADD], [VIEW], or [UPDATE] a Department, Role or an Employee?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the employee or role functions
        if (answer.editORview === "DEPATMENT") {
          editDepartment();
        }
        else if(answer.editORview === "ROLE") {
          editRole();       
        } 
        else if (answer.editORview === "EMPLOYEE") {
          editEmployee();}
        else{
          connection.end();
        }
      });
}

function editDepartment() {
  inquirer
    .prompt({
      name: "editDept",
      type: "list",
      message: "Would you like to [ADD], [VIEW], or [UPDATE] a Department?",
      choices: ["ADD", "VIEW","UPDATE", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the ADD, VIEW or UPDATE functions for Department
      if (answer.editDept === "ADD") {
        addDepartment();
      }
      else if(answer.editDept === "VIEW") {
        addDepartment();
      } 
      else if(answer.editDept === "UPDATE") {
        addDepartment();
      } 
      else{
        connection.end();
      }
    });
}

function editRole() {
  inquirer
    .prompt({
      name: "editRole",
      type: "list",
      message: "Would you like to [ADD], [VIEW], or [UPDATE] a Role?",
      choices: ["ADD", "VIEW","UPDATE", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the ADD, VIEW or UPDATE functions for Role
      if (answer.editRole === "ADD") {
        addDepartment();
      }
      else if(answer.editRole === "VIEW") {
        addDepartment();
      } 
      else if(answer.editRole === "UPDATE") {
        addDepartment();
      } 
      else{
        connection.end();
      }
    });
}

function editEmployee() {
  inquirer
    .prompt({
      name: "editEmployee",
      type: "list",
      message: "Would you like to [ADD], [VIEW], or [UPDATE] an Employee?",
      choices: ["ADD", "VIEW","UPDATE", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the ADD, VIEW or UPDATE functions for Employee
      if (answer.editEmployee === "ADD") {
        addDepartment();
      }
      else if(answer.editEmployee === "VIEW") {
        addDepartment();
      } 
      else if(answer.editEmployee === "UPDATE") {
        addDepartment();
      } 
      else{
        connection.end();
      }
    });
}


//-----------------Placeholder---------------------------//


      //-----------------------------------HALF OF OTHER FUNTION-------
      /*.then(function(answer) {
        // based on their answer, either call the add, view or update functions
        if (answer.editORview === "ADD") {
          addEmployee();
        }
        else if(answer.editORview === "UPDATE") {
          updateEmployee();       
        } 
        else if(answer.editORview === "VIEW") {
            viewEmployee();
        } else{
          connection.end();
        }
      });
  }
  
    //function to handle adding new employee
  function addEmployee() {
    // prompt for info about the employee being added
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to submit?"
        },
        {
          name: "category",
          type: "input",
          message: "What category would you like to place your auction in?"
        },
        {
          name: "startingBid",
          type: "input",
          message: "What would you like your starting bid to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  
  function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM auctions", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item_name);
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in?"
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if bid was high enough
          if (chosenItem.highest_bid < parseInt(answer.bid)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE auctions SET ? WHERE ?",
              [
                {
                  highest_bid: answer.bid
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Bid placed successfully!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Your bid was too low. Try again...");
            start();
          }
        });
    });
  }*/
  
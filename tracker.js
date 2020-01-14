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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  //initial prompt 
  inquirer
    .prompt([
      {
        name: "editORview",
        type: "list",
        message: "Would you like to add, view, or update a Department, Role or an Employee?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"] //GETS STUCK HERE
      }
    ])    
    .then(function (answer) {
      // based on their answer, either call the department. role or employee functions or exit
      if (answer.editORview === "DEPATMENT") {
        editDepartment();
        // ------DO I start completely seperate function for the editDept for each answer or are they nested into editORview department answer?

        function editDepartment() {
          inquirer
            .prompt([
              {
                name: "editDept",
                type: "list",
                message: "Would you like to [ADD], [VIEW], or [UPDATE] a Department?",
                choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
              }
            ])
            .then(function (answer) {
              // based on their answer, either call the ADD, VIEW or UPDATE functions for Department
              if (answer.editDept === "ADD") {
                addDept();
                function addDept() {
                  //ask for new department name
                  inquirer
                    .prompt([
                      {
                        name: "newDept",
                        type: "editor",
                        message: "What's the name of the New Department you would like to add?"
                      },
                    ])
                    .then(function (answer) {
                      // when finished prompting, insert a new department into the db with that info
                      connection.query(
                        "INSERT INTO department SET ?",
                        {
                          name: answer.name
                        },
                        function (err) {
                          if (err) throw err;
                          console.log("Congratulations, your new department" + answer.name + "was added.");
                          start();
                        }
                      )
                    });
                }
              }
              else if (answer.editDept === "VIEW") {
                viewDept();
                function viewDept() {
                  "SELECT * FROM department",
                    //is this how I do this console.log?
                    console.log();
                  start();
                }
              }
              else if (answer.editDept === "UPDATE") {
                UPDATE department,
                SET "name",
                WHERE id = ?,

                updateDept();
                function updateDept() {
                                   
                }
              }
              else if (answer.editDept === "EXIT") {
                connection.end();
                start();
              }
            });
        }
      }
    });
}



/*function editRole() {
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
        addRole();
      }
      else if(answer.editRole === "VIEW") {
        viewRole();
      }
      else if(answer.editRole === "UPDATE") {
        updateRole();
      }
      else{
        connection.end();
      }
    });
}

/*function editEmployee() {
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
        addEmp();
      }
      else if(answer.editEmployee === "VIEW") {
        viewEmp();
      }
      else if(answer.editEmployee === "UPDATE") {
        updateEmp();
      }
      else{
        connection.end();
      }
    })
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

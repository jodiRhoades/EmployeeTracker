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
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
      }
    ])
    .then(function (answer) {
      // based on their answer, either call the department. role or employee functions or exit
      if (answer.editORview === "DEPARTMENT") {
        editDepartment();
      }
      else if (answer.editORview === "ROLE") {
        editRole();
      }
      else if (answer.editORview === "Employee") {
        editEmployee();
      } else {
        connection.end();
      }
    });
}
//Next four functions are for options with the DEPARTMENT Table
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
      }
    });
}

function addDept() {
  //ask for new department name
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What's the name of the New Department you would like to add?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new department into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newDept,
        },
        function (err) {
          if (err) throw err;
          console.log("Congratulations, your new department " + answer.newDept + " was added.");
          start();
        }
      )
    });
}

//--------------MALFUNCTION============viewDept Runs code but stops after the prompt with no response-----------
function viewDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
//--------------MALFUNCTION============updateDept Runs code but stops after the prompt with no response-----------
function updateDept() {
  connection.query("UPDATE department SET ? WHERE ?",
    [
      {
        name: name
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " department updated!\n");
    }
  );
}

//Next four functions are for options with the ROLE Table
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
function addRole() {
  //ask for new department name
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What's the name of the New Role you would like to add?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          name: answer.newRole,
        },
        function (err) {
          if (err) throw err;
          console.log("Congratulations, your new role " + answer.newRole + " was added.");
          start();
        }
      )
    });
}
//--------------MALFUNCTION============viewDept Runs code but stops after the prompt with no response-----------
function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
//--------------MALFUNCTION============updateDept Runs code but stops after the prompt with no response-----------
function updateDept() {
  connection.query("UPDATE role SET ? WHERE ?",
    [
      {
        name: name
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role updated!\n");
    }
  );
}
//Next four functions are for options with the EMPLOYEE Table
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
    }
    )
  }
  function addEmp() {
    //ask for new department name
    inquirer
      .prompt([
        {
          name: "newEmp",
          type: "input",
          message: "What's the first name of the New Employee you would like to add?"
        },
        {
          name: "newEmp",
          type: "input",
          message: "What's the last name of the New Employee you would like to add?"
        },
        {
          name: "newEmp",
          type: "input",
          message: "What's the role_id of the New Employee you would like to add?"
        },
        {
          name: "newEmp",
          type: "input",
          message: "What's the manager_id of the New Employee you would like to add?"
        }
      ])
      .then(function (answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: first_name,
            last_name: last_name,
            role: role_id,
            manager: manager_id
          },
          function (err) {
            if (err) throw err;
            console.log("Congratulations, your new employee " + answer.newEmp + " was added.");
            start();
          }
        )
      });
  }
  
  //--------------MALFUNCTION============viewDept Runs code but stops after the prompt with no response-----------
  function viewEmp() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }
  //--------------MALFUNCTION============updateDept Runs code but stops after the prompt with no response-----------
  function updateEmp() {
    connection.query("UPDATE employee SET ? WHERE ?",
      [
        {
          first_name: first_name
        },
        {
          last_name: last_name           
        },
        {
          role: role_id
        },
        {
          manager: manager_id
        }
      ],
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department updated!\n");
      }
    );
  }






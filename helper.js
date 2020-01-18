function updateEmp() {
    inquirer
      .prompt([
        {
          name: "updateE",
          type: "list",
          message: "What would you like to update on an Employee?",
          choices: ["First Name", "Last Name", "Role", "Manager", "EXIT"]
        }
      ])
      .then(function (answer) {
        // based on their answer either call the functions or exit
        if (answer.updateE === "First Name") {
          upFirst();
        }
        else if (answer.updateE === "Last Name") {
          upLast();
        }
        else if (answer.updateE === "Role") {
          upRole();
        }
        else if (answer.updateE === "Manager") {
          upManager();
        }else {
          connection.end();
        }
      });
  }

  function upFirst() {
    inquirer
      .prompt([
        {
         name: "upFirstEmp",
         type: "input",
         message: "What's the first name of the Employee you would like to update?"
        },
      ])
      .then(function (answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
              name: answer.upFirstEmp,
            },
            function (err) {
                if (err) throw err;
                console.log("Congratulations, your employee " + answer.upFirstEmp + " was added.");
                start();
            },
        });
    }
    

    
    //query the database for all employees 
    connection.query("SELECT * FROM employee", function (err, results) {
      if (err) throw err;
      //ask what they want to update
      
      inquirer
        .prompt([
          {
            name: "upFirstEmp",
            type: "input",
            message: "What's the first name of the Employee you would like to update?"
          },
          {
            name: "upLastEmp",
            type: "input",
            message: "What's the last name of the Employee you would like to update?"
          },
          {
            name: "upRoleEmp",
            type: "list",
            //loop through job roles to pick role needed      
            choices: function () {
              const jobChoices = [];
              for (var i = 0; i < results.length; i++) {
                jobChoices.push(results[i].role_id);
              }
              return jobChoices;
            },
            message: "What's the role_id of the Employee you would like to update?",
          },
          {
            name: "upEmpBoss",
            type: "list",
            //loop through managers to see which one will be thiers if they have one     
            choices: function () {
              const bossChoices = [];
              for (var i = 0; i < results.length; i++) {
                bossChoices.push(results[i].role_id);
              }
              return bossChoices;
            },
            message: "What's the manager_id of the Employee you would like to update?",
          }
        ])
        .then(function (answer) {
          // when finished prompting, insert an updated employee into the db with that info
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.upFirstEmp,
              last_name: answer.upLastEmp,
              role_id: answer.upRoleEmp,
              manager_id: answer.upEmpBoss
            },
            function (err) {
              if (err) throw err;
              console.log(`Congratulations, your employee ${answer.newFirstEmp} ${answer.newLastEmp} was updated.`);
              start();
            }
          );
        },
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                first_name: answer.upFirstEmp
              },
              {
                last_name: answer.upLastEmp
              },
              {
                role_id: answer.upRoleEmp
              },
              {
                manager_id: answer.upEmpBoss
              }
            ],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " department updated!\n");
            }
        )
      );
    });
  }
  
  
  
  
  
  
  
  
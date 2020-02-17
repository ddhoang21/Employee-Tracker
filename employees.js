"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MyPassword",
    database: "employees_db"
});

connection.connect(err => {
    if (err) throw err;
    initPrompt();
});

const initPrompt = () => {
    inquirer.prompt({
        name: "startQuestion",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            // "View All Employees by Department",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
            "Remove Role",
            "Remove Department",
            "Exit"
        ]
    })
    .then(res => {
        switch (res.startQuestion) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

const viewEmployees = () => {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All employees have been retrieved\n");
        console.table(res);
        initPrompt();
    })
}

const viewRoles = () => {
    const query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All roles have been retrieved\n");
        console.table(res);
        initPrompt();
    })
}

const viewDepartments = () => {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All departments have been retrieved\n");
        console.table(res);
        initPrompt();
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "roleID",
            type: "input",
            message: "What is the employee's role ID?",
        },
        {
            name: "managerID",
            type: "input",
            message: "What is the employee's manager ID?"
        }
    ])
    .then(res => {
        const query = "INSERT INTO employee SET ?"
        connection.query(query, 
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleID,
            manager_id: res.managerID

        }, (err, res) => {
            if (err) throw err;
            console.log("The employee has been added\n");
            console.table(res);
            initPrompt();
        })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role's title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role's salary?"
        },
        {
            name: "departmentID",
            type: "input",
            message: "What is the role's department ID?",
        }
    ])
    .then(res => {
        const query = "INSERT INTO role SET ?"
        connection.query(query, 
        {
            title: res.title,
            salary: res.salary,
            department_id: res.departmentID
        }, (err, res) => {
            if (err) throw err;
            console.log("The role has been added\n");
            console.table(res);
            initPrompt();
        })
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the department's name?"
        }
    ])
    .then(res => {
        const query = "INSERT INTO department SET ?"
        connection.query(query, 
        {
            name: res.departmentName
        }, (err, res) => {
            if (err) throw err;
            console.log("The department has been added\n");
            console.table(res);
            initPrompt();
        })
    })
}

const updateRole = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "input",
            message: "What is the employee's ID you would like to update role to?"
        }
    ])
    .then(res => {
        const employeeID = res.employeeID;
        inquirer.prompt([
            {
                name: "newRole",
                type: "input",
                message: "What is the role ID you would like to update to?"
            }
        ])
        .then(res => {
            const newRoleID = res.newRole;
            const query = "UPDATE employee SET role_id=? WHERE id=?";
            connection.query(query, [newRoleID, employeeID
            ], (err, res) => {
                if (err) throw err;
                console.log("The role has been updated\n");
                console.table(res);
                initPrompt();
            }
        )})
    })
}

const updateManager = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "input",
            message: "What is the employee's ID you would like to update manager to?"
        }
    ])
    .then(res => {
        const employeeID = res.employeeID;
        inquirer.prompt([
            {
                name: "newManager",
                type: "input",
                message: "What is the manager's ID you would like to update to?"
            }
        ])
        .then(res => {
            const newManagerID = res.newManager;
            const query = "UPDATE employee SET manager_id=? WHERE id=?";
            connection.query(query, [newManagerID, employeeID
            ], (err, res) => {
                if (err) throw err;
                console.log("The manager has been updated\n");
                console.table(res);
                initPrompt();
            }
        )})
    })
}

const removeEmployee = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "input",
            message: "Which employee ID would you like to remove?"
        }
    ])
    .then(res => {
        const query = "DELETE FROM employee WHERE ?";
        connection.query(query, 
            {
                id: res.employeeID
            }, (err, res) => {
                if (err) throw err;
                console.log("The employee has been removed\n");
                console.table(res);
                initPrompt();
            }
        )
    })
}

const removeRole = () => {
    inquirer.prompt([
        {
            name: "roleID",
            type: "input",
            message: "Which role ID would you like to remove?"
        }
    ])
    .then(res => {
        const query = "DELETE FROM role WHERE ?";
        connection.query(query,
            {
                id: res.roleID
            }, (err, res) => {
                if (err) throw err;
                console.log("The role has been removed\n");
                console.table(res);
                initPrompt();
            }
        )
    })
}

const removeDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentID",
            type: "input",
            message: "Which department ID would you like to remove?"
        }
    ])
    .then(res => {
        const query = "DELETE FROM department WHERE ?";
        connection.query(query,
            {
                id:res.departmentID
            }, (err, res) => {
                if (err) throw err;
                console.log("The department has been removed\n");
                console.table(res);
                initPrompt();
            }
        )
    })
}
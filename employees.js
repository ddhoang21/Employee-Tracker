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
            // "Remove Employee",
            // "Remove Role",
            // "Remove Department",
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
            // case "Remove Employee":
            //     break;
            // case "Remove Role":
            //     break;
            // case "Remove Department":
            //     break;
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
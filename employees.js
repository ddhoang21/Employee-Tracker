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
    const query = "SELECT first_name, last_name, id FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        initPrompt();
    })
}

const viewRoles = () => {
    const query = "SELECT title, salary FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        initPrompt();
    })
}

const viewDepartments = () => {
    const query = "SELECT name FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        initPrompt();
    })
}
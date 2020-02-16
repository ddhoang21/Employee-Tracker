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
    prompt();
});


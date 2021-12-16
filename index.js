const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

connection.connect(err => {
    if (err) throw err
    questions()
})

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            message: "What would you like to do?",
            choices: ['Veiw All', 'View All deparments', 'View all roles', 'View all employees', 'Add a new employee', 'Update an employee', 'Done']
        }
    ]).then(answer => {
        if (answer.main === 'Veiw All') {
            viewAll()
        } else if (answer.main === 'View All deparments') {
            viewAllDepartments()
        } else if (answer.main === 'Add a new employee') {
            addEmployee()
        }
    })
}

function viewAll() {
    connection.query('SELECT * FROM department INNER JOIN employee ON role_id = department.id INNER JOIN role ON department_id = employee.id;', (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewAllDepartments() {
    connection.query("SELECT * FROM department;", (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'What department will your employee work in?'
        }
    ]).then(depAnswer => {
        connection.query('INSERT INTO department SET ?;',
        {
            dep_name: depAnswer.newDep
        })

        inquirer.prompt([
            
        ])
    })
}
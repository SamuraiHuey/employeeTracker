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
            choices: ['Veiw All', 'View All deparments', 'View all roles', 'View all employees', 'Add a new employee', 'Add department', 'Add role', 'Update an employee', 'Done']
        }
    ]).then(answer => {
        if (answer.main === 'Veiw All') {
            viewAll()
        } else if (answer.main === 'View All deparments') {
            viewAllDepartments()
        } else if (answer.main === 'Add a new employee') {
            addEmployee()
        } else if (answer.main === 'View all roles') {
            viewAllRoles()
        } else if (answer.main === 'View all employees') {
            viewEmployees()
        } else if (answer.main === "Add department") {
            addDepartment()
        } else if (answer.main === "Add role") {
            addRole()
        } else if (answer.main === 'Update an employee') {
            update()
        } else {
            connection.end()
        }
    })
}

function viewAll() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (err, res) => {
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

function viewAllRoles() {
    connection.query("SELECT * FROM role;", (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee;", (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'
        }
    ]).then(answer => {
        connection.query("INSERT INTO department SET ?;",
            {
                name: answer.department
            }
        )
        console.log('Added new department');
        questions()
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is department Id for this role?'
        }
    ]).then(answer => {
        connection.query("INSERT INTO role SET ?;",
        {
            title: answer.roleTitle,
            salary: answer.salary,
            department_id: answer.departmentId
        }
        )
        console.log('Added new role');
        questions()
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the empoyees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id of the employees role?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager id of the employees manager?'
        }
    ]).then(answer => {
        connection.query("INSERT INTO employee SET ?;",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        }
        )
        console.log('Added new Employee');
        questions()
    })
}

function update() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'For the employee you want to update, what is their ID number?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role ID number for the updated employee?'
        }
    ]).then(answer => {
        connection.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: answer.role
                },
                {
                    id: answer.employee
                }
            ]
        )
        questions()
    })
}
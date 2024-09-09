module.exports = {
  defaultPort: 3000,

  development: {
    username: "root",
    password: null,
    database: "task_management",
    logging: true,
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "task_management_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "task_management_prod",
    host: "127.0.0.1",
    dialect: "mysql"
  },
}

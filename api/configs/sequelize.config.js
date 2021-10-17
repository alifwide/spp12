
const config = require('./server.config')

module.exports = {
  "development": {
    "username": config.mysql.user,
    "password": config.mysql.password,
    "database": config.mysql.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": config.mysql.user,
    "password": config.mysql.password,
    "database": config.mysql.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": config.mysql.user,
    "password": config.mysql.password,
    "database": config.mysql.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

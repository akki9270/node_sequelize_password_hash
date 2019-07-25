// SQL specifics
exports.SQL = {
    "username": "root",
    //"password": "process.env.SQL_PASSWORD", // for prod
    "password": "",
    "database": "node_sequelize",
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql"
  };

exports.SECRET = '9211dc48153ba70a02d0df64b2550134';
exports.TOKENHEADER = 'x-access-token';
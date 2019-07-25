const fs = require("fs"),
      path = require("path"),
      Sequelize = require("sequelize");

const config = require('../config/config');
const SQL = config.SQL
let db = {};

// Sequlize instance
const sequelize = new Sequelize(SQL.database, SQL.username, SQL.password, {
    host: SQL.host, dialect:'mysql', port:SQL.port,
    logging: false
  });

  // Dynamically add all files in models directory
(function init_sequelize(){
    fs
      .readdirSync(__dirname)
      .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
      })
      .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
      });
  
    Object.keys(db).forEach(function(modelName) {
      if ("associate" in db[modelName]) {
        db[modelName].associate(db);
      };
    });
  
    db.sequelize = sequelize;
    module.exports = db;
  })();

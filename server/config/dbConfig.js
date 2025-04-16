'use strict';

import logger from './logger';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require("../config");
const componentsDir = path.join(__dirname, '../component');


const db = {};

let sequelize = new Sequelize(config.DATABASE_NAME, "root",null, {
  host: config.HOST,
  dialect: config.DIALECT,
});

const readDirectoryRecursive = (dir) => {
  let files = [];
  const items = fs.readdirSync(dir); 
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.lstatSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(readDirectoryRecursive(fullPath));
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

const allFiles = readDirectoryRecursive(componentsDir);

allFiles
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&           // Skip hidden files (e.g., .env, .DS_Store)
      file.slice(-3) === '.js' &&          // Only include .js files
      file.indexOf('.test.js') === -1 &&     // Skip test files (.test.js)
      file.indexOf('.model.js') !== 0
    );
  })
  .forEach(file => {
    const folderName = path.basename(path.dirname(file));
    if (folderName && path.basename(file) === `${folderName}.model.js`) {
      try {
        const model = require(file)(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      } catch (err) {
        console.error(`Error requiring model file: ${file}`, err);
      }
    }
  });

// Loop through all models and associate them if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync all the models
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('All models are synced');
    logger.info("HEllo")
  })
  .catch(err => {
    console.error('Error syncing models:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
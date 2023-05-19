import Sequelize from "sequelize";
import {CourseModel} from './course.js';

const sequelize = new Sequelize('blog', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const courses = CourseModel(sequelize, Sequelize);

db.courses = courses;

export default db;
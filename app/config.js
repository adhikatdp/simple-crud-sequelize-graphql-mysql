import Sequelize from 'Sequelize';

//user : your username database
//pass : your password database
//host : your host database
//db_name : your db_name database
const db = new Sequelize('mysql://user:pass@host:3306/db_name');

export default db;
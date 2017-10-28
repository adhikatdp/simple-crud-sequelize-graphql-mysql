import Sequelize from 'Sequelize';

//user : your username database
//pass : your password database
//host : your host database
//db_name : your db_name database

const db = new Sequelize('mysql://root:hansen59@localhost:3306/graphql');

export default db;
import { Sequelize } from "sequelize";

const db = new Sequelize('crud_project', 'root', '1453', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
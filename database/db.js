const { Sequelize } = require("sequelize");
let my_ssl
if (process.env.DATABASE_URL.includes("localhost")) {
    my_ssl = false;
} else {
    my_ssl = {
        rejectUnauthorized: false
    }
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: my_ssl
    }
});
const initModels = require("../models/init-models")(sequelize);

exports.sequelize = sequelize

exports.models = initModels

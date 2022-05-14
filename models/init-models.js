const DataTypes = require("sequelize").DataTypes;
const _orders = require("./orders");
const _products = require("./products");
const _users = require("./users");

function initModels(sequelize) {
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  orders.belongsTo(products, { as: "idProductProduct", foreignKey: "idProduct"});
  products.hasMany(orders, { as: "orders", foreignKey: "idProduct"});
  orders.belongsTo(users, { as: "idClientUser", foreignKey: "idClient"});
  users.hasMany(orders, { as: "orders", foreignKey: "idClient"});
  orders.belongsTo(users, { as: "idCurierUser", foreignKey: "idCurier"});
  users.hasMany(orders, { as: "idCurierOrders", foreignKey: "idCurier"});

  return {
    orders,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

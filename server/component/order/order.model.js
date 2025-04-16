// user.model.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  
    return Order;
  };
  
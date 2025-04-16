// user.model.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  
    return Product;
  };
  
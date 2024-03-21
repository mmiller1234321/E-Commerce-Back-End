// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Import the Product and Tag models
const Product = require('./Product');
const Tag = require('./Tag');

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for ProductTag model
ProductTag.init(
  {
    // Define id field
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define product_id field
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id'
      }
    },
    // Define tag_id field
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

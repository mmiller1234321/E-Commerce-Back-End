require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

try {
  if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
  } else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
  }
} catch (error) {
  console.error('Error creating Sequelize instance:', error);
  process.exit(1); // Exit the process if sequelize instance creation fails
}

module.exports = sequelize;

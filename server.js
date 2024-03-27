const express = require('express');
const routes = require('./routes');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Define sequelize connection
let sequelize;
try {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost', // You may want to include DB_HOST in your .env file
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  });
} catch (error) {
  console.error('Error creating Sequelize instance:', error);
  process.exit(1); // Exit the process if sequelize instance creation fails
}

// Export sequelize instance
module.exports = sequelize;

// Sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit(1); // Exit the process if sequelize sync fails
});

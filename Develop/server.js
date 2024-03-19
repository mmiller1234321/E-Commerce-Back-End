const express = require('express');
import routes from './routes'; // Convert the import statement to ES module syntax
// import sequelize connection
import sequelize from './config/connection'; // Convert the import statement to ES module syntax

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('App listening on port 3001!'));
});

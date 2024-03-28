const http = require('http')
const pool = require('./db');
const express = require('express')
const router = express.Router()

router.get('/myrecipes', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM recipes');
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
    }
});

// const Recipe = sequelize.define('Recipe', {
//   name: DataTypes.STRING,
//   ingredients: DataTypes.TEXT,
//   instructions: DataTypes.TEXT
// });

  // Define a route to handle saving recipes
  router.post('/myrecipes', async (req, res) => {
    try {
      const { name } = req.body;
      const data = {name:name}
      console.debug(data)
      
      if (!name) {
        throw new Error("Name field is missing in the request body");
      }
      // Insert the recipe into the database
      const client = await pool.connect();
      const result = await client.query('INSERT INTO recipes (name) VALUES ($1) RETURNING *', [name]);
      client.release();

      res.status(201).json(result.rows[0]); // Return the saved recipe
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to save recipe backend' }); // Provide more detailed error message
    }
  });



module.exports = router
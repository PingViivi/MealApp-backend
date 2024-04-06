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

router.get('/myrecipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM recipes WHERE id = $1', [recipeId]);

      if (result.rows.length === 0) {
          // If no recipe is found with the provided ID, return a 404 Not Found response
          res.status(404).send('Recipe not found');
      } else {
          // If a recipe is found, return it
          res.json(result.rows[0]);
      }

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
      const { name, category, duration, recipeYield, description, area, image, recipeIngredient, recipeInstructions } = req.body;
      
      // const data = {name:name}
      // console.debug(data)
      
      if (!name) {
        throw new Error("Name field is missing in the request body");
      }
      // Insert the recipe into the database
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO recipes (name, category, duration, recipeyield, description, area, image, recipeingredient, recipeinstructions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [name, category, duration, recipeYield, description, area, image, recipeIngredient, recipeInstructions]
    );
      client.release();

      res.status(201).json(result.rows[0]); // Return the saved recipe
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to save recipe backend' }); // Provide more detailed error message
    }
  });



module.exports = router
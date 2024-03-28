const http = require('http')
const express = require('express')
const router = express.Router()
const pool = require('./db');
  
  // GET meal categories
  router.get('/categories', async (req, res) => {
    const categoriesUrl = `https://themealdb.com/api/json/v1/1/categories.php`;
    try {
      const response = await fetch(categoriesUrl);
      const data = await response.json();
      const categories = data.categories
      res.status(200).json({ categories });
  
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data " + error })
    }
  });
  
  // GET meals by category
  router.get('/categories/:category', async (req, res) => { 
    const category = req.params.category
    const categoryUrl = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  
    try {
      const response = await fetch(categoryUrl);
      const data = await response.json();
      const meals = data.meals
      res.status(200).json({ meals });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data " + error })
    }
  }); 
  
  // GET recipes by meal
  router.get('/meals/:id', async (req, res) => {
    const id = req.params.id
    const mealUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    try {
      const response = await fetch(mealUrl);
      const data = await response.json();
      const recipe = data.meals
      res.status(200).json({ recipe });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data " + error})
    }
  })

  router.get('/saved', (req, res) => {
    res.send('<p> Saved </p>')
  })
  

module.exports = router
const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
//const apiUrl = `https://themealdb.com/api/json/v1/1/`;

// Fetch meal categories
app.get('/api/categories', async (req, res) => {
  const categoriesUrl = `https://themealdb.com/api/json/v1/1/categories.php`;
  try {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    const categories = data.categories
    res.status(200).json({ categories });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" + error })
  }
});

// Filter by category
const category = 'Seafood'
app.get(`/api/category/${category}`, async (req, res) => {
  const categoriesUrl = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    const meals = data.meals
    res.status(200).json({ meals });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" + error })
  }
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




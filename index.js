const express = require('express')
const cors = require('cors')
const app = express()
const apiRoutes = require('./src/routes-api')
const dbRoutes = require('./src/routes-db')

app.use(express.json())
app.use(cors())
//const apiUrl = `https://themealdb.com/api/json/v1/1/`;

app.get('/', (req, res) => {
  res.send('<p> Up and running </p>')
})

app.use('/api', apiRoutes)
app.use('/db', dbRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




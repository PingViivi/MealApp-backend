const express = require('express')
const cors = require('cors')
const app = express()
const apiRoutes = require('./src/routes-api')
const dbRoutes = require('./src/routes-db')
const userRoutes = require('./src/routes-user')

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app.use(express.json())
app.use(cors())
//const apiUrl = `https://themealdb.com/api/json/v1/1/`;


// Routes
app.get('/', (req, res) => {
  res.send('<p> Up and running </p>')
})
app.use('/', userRoutes)
app.use('/api', apiRoutes)
app.use('/db', dbRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




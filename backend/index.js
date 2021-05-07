require("dotenv").config();
const express = require('express')
const app = express()
const db = require("./app/models")
const routes = require('./app/routes')
const server = require('http').Server(app)
const cors = require('cors')
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', routes);

db.sequelize.sync()


server.listen(port);

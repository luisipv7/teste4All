require('dotenv').config()
const Sequelize = require('sequelize')
const dbConfig = require('../config/connectDB')

const User = require('../../models/users.model')
const db = new Sequelize(dbConfig)
User.init(db)


module.exports = db

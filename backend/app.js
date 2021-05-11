const express = require('express')
const cors = require('cors')
const routes = require('./app/routes')
require('./app/core/db/index')

class AppController {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: true }))
  }

  routes () {
    this.express.use('/api/v1/users', routes)
  }
}

module.exports = new AppController().express

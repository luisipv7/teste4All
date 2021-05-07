const express = require('express')
const routes = express.Router()
const users = require('../app/controller/users.controller')
const auth = require('../app/controller/auth.controller')

routes.post('/', users.create)
routes.post('/login', users.login)
routes.get('/', auth.authenticateToken, users.findAll)
routes.get('/:id', users.findOne)
routes.put('/:id', users.update)
routes.delete('/:id', users.delete)
routes.delete('/', users.deleteAll)

module.exports = routes

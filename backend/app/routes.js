const routes = require('express').Router()
const users = require('../app/controller/users.controller')
const auth = require('../app/controller/auth.controller')

routes.post('/', users.create)
routes.post('/login', users.login)
routes.get('/', auth.authenticateToken, users.findAll)
routes.get('/:id', auth.authenticateToken, users.findOne)
routes.put('/:id', auth.authenticateToken, users.update)
routes.delete('/:id', auth.authenticateToken, users.delete)

module.exports = routes

require('dotenv').config()
const app = require('./app')
const server = require('http').Server(app)
const port = process.env.PORT || 8080

server.listen(port);

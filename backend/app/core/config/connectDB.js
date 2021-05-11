require('dotenv').config()
module.exports = {
  dialect: 'postgres',
  host: process.env.HDOCKER,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true
  }
}

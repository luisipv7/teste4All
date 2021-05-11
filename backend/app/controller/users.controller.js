const User = require('../models/users.model')
const jwt = require('jsonwebtoken')
const { v5: uuid } = require("uuid")
require('dotenv').config()
const MY_NAMESPACE = '55238d15-c926-4598-b49d-cf4e913ba13c';


module.exports = {
  async create (req, res) {
    if (!req.body.email) {
      res.status(400).send({
        message: 'Email não pode estar vazio!'
      });
      return;
    }

    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: uuid(req.body.password, MY_NAMESPACE)
      };

      await User.create(user)
      return res.status(200).json(user)

    } catch (error) {
      return res.status(500).send({ error: error.message });
    }


  },

  async findAll (req, res) {
    const users = await User.findAll()

    if (users) {
      return res.status(200).json(users)
    }

    throw new Error('Não foi possivel encontrar informações!')

  },
  async findOne (req, res) {

    try {
      const id = req.params.id
      const userFound = await User.findByPk(id)

      if (userFound) {
        return res.status(200).json(userFound)
      }

      throw new Error('Usuário inexistente!')

    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async update (req, res) {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: uuid(req.body.password, MY_NAMESPACE)
      };
      const id = await req.params.id
      const [update] = await User.update(user, {
        where: { id }
      })

      if (update) {
        const userUpdated = await User.findByPk(id)
        return res.status(200).json(userUpdated)
      }
      throw new Error('Usuário inexistente!')

    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async delete (req, res) {
    try {
      const id = req.params.id
      const userDeleted = await User.destroy({ where: { id } })

      if (userDeleted) {
        const userDeleteded = await User.findByPk(id)
        return res.status(200).json(userDeleteded)
      }
      throw new Error('Usuário inexistente!')
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }

  },

  async login (req, res) {
    const email = req.body.email
    const dataValues = await User.findOne({ where: { email } })
    const pass = uuid(req.body.password, MY_NAMESPACE)
    const confirmPass = dataValues.password.localeCompare(pass)
    if (confirmPass !== 0) {
      res.status(400).send({
        message: 'Usuário não encontrado!'
      })
    }
    let token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: 84600 });
    res.json(token);
  },
}

const db = require('../models');
const Users = db.users;
const Op = db.Sequelize.Op;
const { fromString } = require('uuidv4')
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

module.exports = {
  async create (req, res) {
    if (!req.body.email) {
      res.status(400).send({
        message: 'Email não pode estar vazio!'
      });
      return;
    }
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: fromString(req.body.password)
    };

    Users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Algum erro ocorreu enquanto criava o usuário.'
        })
      })
  },

  async findAll (req, res) {
    const email = req.body.email
    let condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null

    Users.findAll({ where: condition })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Algum erro ocorreu enquanto recuperava os usuários.'
        })
      })
  },
  async findOne (req, res) {
    const id = req.params.id

    Users.findByPk(id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Erro ao recuperar o tutorial com id' + id
        })
      })
  },

  async update (req, res) {
    const id = req.params.id

    Users.update(req.body, {
      where: { id }
    })
      .then(num => {
        if (num === 1) {
          res.send({
            message: 'Usuário foi atualizado com sucesso!'
          })
        } else {
          res.send({
            message: `Não é possível atualizar o usuário com id = ${id}. Talvez usuário não tenha sido encontrado ou req.body está vazio!`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Erro ao atualizar o usuário com o id: ' + id
        })
      })
  },
  async delete (req, res) {
    const id = req.params.id

    Users.destroy({
      where: { id }
    })
      .then(num => {
        if (num === 1) {
          res.send({
            message: 'Usuário foi deletado com sucesso!'
          })
        } else {
          res.send({
            message: `Não é possível deletar o usuário com id = ${id}. Talvez usuário não tenha sido encontrado ou req.body está vazio!`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Erro ao deletar o usuário com o id: ' + id
        })
      })
  },
  async deleteAll (req, res) {
    Users.destroy({
      where: {},
      truncate: true
    })
      .then(nums => {
        res.send({ message: `${nums} usuários foram deletado com sucesso!` })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Ocorreu algum erro ao remover todos os usuários.'
        })
      })
  },
  async login (req, res) {
    const email = req.body.email
    let condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null

    const Has = await Users.findAll({ where: condition })
      .then(data => {
        return data.map(R => R.dataValues)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Algum erro ocorreu enquanto recuperava os usuários.'
        })
      })
    const pass = fromString(req.body.password)
    const confirmPass = Has.map(R => R.password.includes(pass))
    if (!confirmPass[0]) {
      res.status(400).send({
        message: 'Usuário não encontrado!'
      })
    }
    let token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: 84600 });
    res.json(token);
  },
}

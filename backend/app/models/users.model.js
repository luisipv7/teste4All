module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    }
  })

  return Users
}

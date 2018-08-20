'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    action: DataTypes.STRING,
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  }
  return Todo;
};
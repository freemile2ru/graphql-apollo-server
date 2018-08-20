'use strict';
const bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'This username is already taken.'
      },
      validate: {
        notEmpty: {
          msg: ' username field is empty'
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      unique: {
        msg: 'This email is already taken.'
      },
      validate: {
        notEmpty: {
          msg: 'email field is empty'
        },
        isEmail: {
          args: true,
          msg: 'input correct email field'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email field is empty'
        },
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('password should be atleast 8 characters');
          }
        },
      }
    }
   },{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  User.associate = (models) => {
      User.hasMany(models.Todo, {
        foreignKey: 'userId'
      });
  };

  /**
   * verify plain password against user's hashed password
   * @method
   * @param {String} password password to be encrypted
   * @returns {Boolean} Validity of passowrd
   */
  User.prototype.passwordMatched = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  sequelize.sync();

  return User;
};
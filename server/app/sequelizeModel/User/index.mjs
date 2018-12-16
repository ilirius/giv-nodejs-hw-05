export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    surName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    access_token: {
      type: DataTypes.UUID
    },
    image: {
      type: DataTypes.STRING
    },
    __id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });
  User.associate = function (models) {
    User.belongsTo(models.permission);
    User.hasMany(models.newsmessage);
  };

  return User;
};

/*
    password: {
      type: DataTypes.VIRTUAL.UNSIGNED.ZEROFILL,
      set: (val) => {
        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);
        this.setDataValue('password_hash', this.salt + val);
      },
      validate: {
        isLongEnough: (val) => {
          if (val.length < 7) {
            throw new Error('Please choose a longer password');
          }
        }
      }
    },
*/

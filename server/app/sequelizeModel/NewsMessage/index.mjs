export default (sequelize, DataTypes) => {
  const Newsmessage = sequelize.define('newsmessage', {
    text: {
      type: DataTypes.TEXT
    },
    theme: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  });

  Newsmessage.associate = function (models) {
    Newsmessage.belongsTo(models.user);
  };

  return Newsmessage;
};

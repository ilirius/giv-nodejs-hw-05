export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    __id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Permission.associate = function (models) {
    Permission.hasOne(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    Permission.belongsTo(models.chat);
    Permission.belongsTo(models.news);
    Permission.belongsTo(models.setting);
  };

  return Permission;
};

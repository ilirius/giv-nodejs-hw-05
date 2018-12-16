export default (sequelize, DataTypes) => {
  const Setting = sequelize.define('setting', {
    C: {
      type: DataTypes.BOOLEAN
    },
    R: {
      type: DataTypes.BOOLEAN
    },
    U: {
      type: DataTypes.BOOLEAN
    },
    D: {
      type: DataTypes.BOOLEAN
    },
    __id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });
  return Setting;
};

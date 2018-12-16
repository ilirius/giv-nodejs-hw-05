export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('chat', {
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
  return Chat;
};

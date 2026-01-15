const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Board = sequelize.define('Board', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    background: {
      type: DataTypes.STRING(255),
      defaultValue: '#0079bf',
    },
  }, {
    tableName: 'boards',
  });

  return Board;
};

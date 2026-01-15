const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Label = sequelize.define('Label', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'board_id',
    },
  }, {
    tableName: 'labels',
  });

  return Label;
};

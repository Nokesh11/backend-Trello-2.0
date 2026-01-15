const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const List = sequelize.define('List', {
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
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'board_id',
    },
  }, {
    tableName: 'lists',
    indexes: [
      {
        fields: ['board_id', 'position'],
      },
    ],
  });

  return List;
};

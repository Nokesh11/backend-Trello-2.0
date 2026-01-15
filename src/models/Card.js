const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_date',
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    listId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'list_id',
    },
  }, {
    tableName: 'cards',
    indexes: [
      {
        fields: ['list_id', 'position'],
      },
    ],
  });

  return Card;
};

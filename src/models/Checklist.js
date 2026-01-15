const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Checklist = sequelize.define('Checklist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Checklist',
      validate: {
        notEmpty: true,
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cardId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'card_id',
    },
  }, {
    tableName: 'checklists',
  });

  return Checklist;
};

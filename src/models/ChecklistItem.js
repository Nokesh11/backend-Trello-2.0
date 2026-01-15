const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChecklistItem = sequelize.define('ChecklistItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    checklistId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'checklist_id',
    },
  }, {
    tableName: 'checklist_items',
  });

  return ChecklistItem;
};

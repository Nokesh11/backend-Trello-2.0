const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    avatarUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'avatar_url',
    },
    initials: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(20),
      defaultValue: '#DFE1E6',
    },
  }, {
    tableName: 'members',
  });

  return Member;
};

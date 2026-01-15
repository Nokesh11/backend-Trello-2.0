const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  dialectOptions: dbConfig.dialectOptions || {},
  define: dbConfig.define,
});

// Import models
const Board = require('./Board')(sequelize);
const List = require('./List')(sequelize);
const Card = require('./Card')(sequelize);
const Label = require('./Label')(sequelize);
const Member = require('./Member')(sequelize);
const Checklist = require('./Checklist')(sequelize);
const ChecklistItem = require('./ChecklistItem')(sequelize);

// Define associations

// Board -> Lists (one-to-many)
Board.hasMany(List, { foreignKey: 'boardId', as: 'lists', onDelete: 'CASCADE' });
List.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });

// List -> Cards (one-to-many)
List.hasMany(Card, { foreignKey: 'listId', as: 'cards', onDelete: 'CASCADE' });
Card.belongsTo(List, { foreignKey: 'listId', as: 'list' });

// Board -> Labels (one-to-many)
Board.hasMany(Label, { foreignKey: 'boardId', as: 'labels', onDelete: 'CASCADE' });
Label.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });

// Card -> Labels (many-to-many)
Card.belongsToMany(Label, { through: 'card_labels', foreignKey: 'cardId', as: 'labels' });
Label.belongsToMany(Card, { through: 'card_labels', foreignKey: 'labelId', as: 'cards' });

// Card -> Members (many-to-many)
Card.belongsToMany(Member, { through: 'card_members', foreignKey: 'cardId', as: 'members' });
Member.belongsToMany(Card, { through: 'card_members', foreignKey: 'memberId', as: 'cards' });

// Card -> Checklists (one-to-many)
Card.hasMany(Checklist, { foreignKey: 'cardId', as: 'checklists', onDelete: 'CASCADE' });
Checklist.belongsTo(Card, { foreignKey: 'cardId', as: 'card' });

// Checklist -> ChecklistItems (one-to-many)
Checklist.hasMany(ChecklistItem, { foreignKey: 'checklistId', as: 'items', onDelete: 'CASCADE' });
ChecklistItem.belongsTo(Checklist, { foreignKey: 'checklistId', as: 'checklist' });

module.exports = {
  sequelize,
  Board,
  List,
  Card,
  Label,
  Member,
  Checklist,
  ChecklistItem,
};

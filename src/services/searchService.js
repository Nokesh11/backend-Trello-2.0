const { Op } = require('sequelize');
const { Card, List, Label, Member, Checklist, ChecklistItem } = require('../models');

const searchService = {
  async searchCards({ query, boardId, labels, members, dueDate }) {
    const whereClause = {
      archived: false,
    };

    // Title search
    if (query) {
      whereClause.title = {
        [Op.iLike]: `%${query}%`,
      };
    }

    // Build include for filtering
    const includeClause = [
      { model: Label, as: 'labels' },
      { model: Member, as: 'members' },
      {
        model: Checklist,
        as: 'checklists',
        include: [{ model: ChecklistItem, as: 'items' }],
      },
    ];

    // List filter for boardId
    if (boardId) {
      includeClause.push({
        model: List,
        as: 'list',
        where: { boardId },
        required: true,
      });
    } else {
      includeClause.push({
        model: List,
        as: 'list',
        required: true,
      });
    }

    // Due date filter
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dueDate) {
        case 'overdue':
          whereClause.dueDate = {
            [Op.lt]: today,
            [Op.ne]: null,
          };
          break;
        case 'today':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          whereClause.dueDate = {
            [Op.gte]: today,
            [Op.lt]: tomorrow,
          };
          break;
        case 'week':
          const nextWeek = new Date(today);
          nextWeek.setDate(nextWeek.getDate() + 7);
          whereClause.dueDate = {
            [Op.gte]: today,
            [Op.lt]: nextWeek,
          };
          break;
        case 'none':
          whereClause.dueDate = null;
          break;
      }
    }

    let cards = await Card.findAll({
      where: whereClause,
      include: includeClause,
      order: [['position', 'ASC']],
    });

    // Filter by labels (post-query filter for many-to-many)
    if (labels && labels.length > 0) {
      cards = cards.filter(card =>
        card.labels.some(label => labels.includes(label.id))
      );
    }

    // Filter by members (post-query filter for many-to-many)
    if (members && members.length > 0) {
      cards = cards.filter(card =>
        card.members.some(member => members.includes(member.id))
      );
    }

    return cards;
  },
};

module.exports = searchService;

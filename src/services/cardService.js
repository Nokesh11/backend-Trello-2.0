const { Card, Label, Member, Checklist, ChecklistItem } = require('../models');

const cardService = {
  async createCard({ title, listId, description }) {
    // Get max position for the list
    const maxPosition = await Card.max('position', { where: { listId } }) || 0;
    return Card.create({
      title,
      listId,
      description,
      position: maxPosition + 1,
    });
  },

  async getCardById(id) {
    return Card.findByPk(id, {
      include: [
        { model: Label, as: 'labels' },
        { model: Member, as: 'members' },
        {
          model: Checklist,
          as: 'checklists',
          order: [['position', 'ASC']],
          include: [
            {
              model: ChecklistItem,
              as: 'items',
              order: [['position', 'ASC']],
            },
          ],
        },
      ],
      order: [
        [{ model: Checklist, as: 'checklists' }, 'position', 'ASC'],
        [{ model: Checklist, as: 'checklists' }, { model: ChecklistItem, as: 'items' }, 'position', 'ASC'],
      ],
    });
  },

  async updateCard(id, { title, description }) {
    const card = await Card.findByPk(id);
    if (!card) return null;
    
    if (title !== undefined) card.title = title;
    if (description !== undefined) card.description = description;
    await card.save();
    return this.getCardById(id);
  },

  async deleteCard(id) {
    const card = await Card.findByPk(id);
    if (!card) return false;
    await card.destroy();
    return true;
  },

  async archiveCard(id, archived) {
    const card = await Card.findByPk(id);
    if (!card) return null;
    
    card.archived = archived;
    await card.save();
    return card;
  },

  async moveCard(id, listId, position) {
    const card = await Card.findByPk(id);
    if (!card) return null;

    card.listId = listId;
    if (position !== undefined) {
      card.position = position;
    }
    await card.save();
    return this.getCardById(id);
  },

  async reorderCards(sourceListId, destinationListId, cardIds) {
    // Update positions based on array order
    const updatePromises = cardIds.map((cardId, index) => {
      const updateData = { position: index };
      if (destinationListId) {
        updateData.listId = destinationListId;
      }
      return Card.update(updateData, { where: { id: cardId } });
    });
    await Promise.all(updatePromises);
    return true;
  },

  async updateCardLabels(id, labelIds) {
    const card = await Card.findByPk(id);
    if (!card) return null;

    const labels = await Label.findAll({ where: { id: labelIds } });
    await card.setLabels(labels);
    return this.getCardById(id);
  },

  async updateCardMembers(id, memberIds) {
    const card = await Card.findByPk(id);
    if (!card) return null;

    const members = await Member.findAll({ where: { id: memberIds } });
    await card.setMembers(members);
    return this.getCardById(id);
  },

  async updateDueDate(id, dueDate) {
    const card = await Card.findByPk(id);
    if (!card) return null;

    card.dueDate = dueDate || null;
    await card.save();
    return this.getCardById(id);
  },
};

module.exports = cardService;

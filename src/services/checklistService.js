const { Checklist, ChecklistItem } = require('../models');

const checklistService = {
  async createChecklist({ title, cardId }) {
    // Get max position for the card
    const maxPosition = await Checklist.max('position', { where: { cardId } }) || 0;
    const checklist = await Checklist.create({
      title: title || 'Checklist',
      cardId,
      position: maxPosition + 1,
    });
    return {
      ...checklist.toJSON(),
      items: [],
    };
  },

  async updateChecklist(id, { title }) {
    const checklist = await Checklist.findByPk(id);
    if (!checklist) return null;
    
    if (title !== undefined) checklist.title = title;
    await checklist.save();
    return checklist;
  },

  async deleteChecklist(id) {
    const checklist = await Checklist.findByPk(id);
    if (!checklist) return false;
    await checklist.destroy();
    return true;
  },

  async addChecklistItem(checklistId, { text }) {
    const checklist = await Checklist.findByPk(checklistId);
    if (!checklist) return null;

    // Get max position for the checklist
    const maxPosition = await ChecklistItem.max('position', { where: { checklistId } }) || 0;
    return ChecklistItem.create({
      text,
      checklistId,
      position: maxPosition + 1,
      completed: false,
    });
  },

  async updateChecklistItem(itemId, { text, completed }) {
    const item = await ChecklistItem.findByPk(itemId);
    if (!item) return null;
    
    if (text !== undefined) item.text = text;
    if (completed !== undefined) item.completed = completed;
    await item.save();
    return item;
  },

  async deleteChecklistItem(itemId) {
    const item = await ChecklistItem.findByPk(itemId);
    if (!item) return false;
    await item.destroy();
    return true;
  },
};

module.exports = checklistService;

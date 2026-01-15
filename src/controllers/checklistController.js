const checklistService = require('../services/checklistService');

const checklistController = {
  async createChecklist(req, res, next) {
    try {
      const { title, cardId } = req.body;
      if (!cardId) {
        return res.status(400).json({ error: { message: 'cardId is required' } });
      }
      const checklist = await checklistService.createChecklist({ title, cardId });
      res.status(201).json(checklist);
    } catch (error) {
      next(error);
    }
  },

  async updateChecklist(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const checklist = await checklistService.updateChecklist(id, { title });
      if (!checklist) {
        return res.status(404).json({ error: { message: 'Checklist not found' } });
      }
      res.json(checklist);
    } catch (error) {
      next(error);
    }
  },

  async deleteChecklist(req, res, next) {
    try {
      const { id } = req.params;
      const success = await checklistService.deleteChecklist(id);
      if (!success) {
        return res.status(404).json({ error: { message: 'Checklist not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async addChecklistItem(req, res, next) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: { message: 'Text is required' } });
      }
      const item = await checklistService.addChecklistItem(id, { text });
      if (!item) {
        return res.status(404).json({ error: { message: 'Checklist not found' } });
      }
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  async updateChecklistItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const { text, completed } = req.body;
      const item = await checklistService.updateChecklistItem(itemId, { text, completed });
      if (!item) {
        return res.status(404).json({ error: { message: 'Checklist item not found' } });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async deleteChecklistItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const success = await checklistService.deleteChecklistItem(itemId);
      if (!success) {
        return res.status(404).json({ error: { message: 'Checklist item not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = checklistController;

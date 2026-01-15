const listService = require('../services/listService');

const listController = {
  async createList(req, res, next) {
    try {
      const { title, boardId } = req.body;
      if (!title || !boardId) {
        return res.status(400).json({ error: { message: 'Title and boardId are required' } });
      }
      const list = await listService.createList({ title, boardId });
      res.status(201).json(list);
    } catch (error) {
      next(error);
    }
  },

  async updateList(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const list = await listService.updateList(id, { title });
      if (!list) {
        return res.status(404).json({ error: { message: 'List not found' } });
      }
      res.json(list);
    } catch (error) {
      next(error);
    }
  },

  async deleteList(req, res, next) {
    try {
      const { id } = req.params;
      const success = await listService.deleteList(id);
      if (!success) {
        return res.status(404).json({ error: { message: 'List not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async reorderLists(req, res, next) {
    try {
      const { boardId, listIds } = req.body;
      if (!boardId || !listIds || !Array.isArray(listIds)) {
        return res.status(400).json({ error: { message: 'boardId and listIds array are required' } });
      }
      await listService.reorderLists(boardId, listIds);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = listController;

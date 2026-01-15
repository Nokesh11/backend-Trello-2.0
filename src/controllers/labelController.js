const labelService = require('../services/labelService');

const labelController = {
  async createLabel(req, res, next) {
    try {
      const { name, color, boardId } = req.body;
      if (!color || !boardId) {
        return res.status(400).json({ error: { message: 'Color and boardId are required' } });
      }
      const label = await labelService.createLabel({ name, color, boardId });
      res.status(201).json(label);
    } catch (error) {
      next(error);
    }
  },

  async updateLabel(req, res, next) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;
      const label = await labelService.updateLabel(id, { name, color });
      if (!label) {
        return res.status(404).json({ error: { message: 'Label not found' } });
      }
      res.json(label);
    } catch (error) {
      next(error);
    }
  },

  async deleteLabel(req, res, next) {
    try {
      const { id } = req.params;
      const success = await labelService.deleteLabel(id);
      if (!success) {
        return res.status(404).json({ error: { message: 'Label not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = labelController;

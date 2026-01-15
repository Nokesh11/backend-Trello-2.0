const cardService = require('../services/cardService');

const cardController = {
  async createCard(req, res, next) {
    try {
      const { title, listId, description } = req.body;
      if (!title || !listId) {
        return res.status(400).json({ error: { message: 'Title and listId are required' } });
      }
      const card = await cardService.createCard({ title, listId, description });
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  },

  async getCardById(req, res, next) {
    try {
      const { id } = req.params;
      const card = await cardService.getCardById(id);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const card = await cardService.updateCard(id, { title, description });
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async deleteCard(req, res, next) {
    try {
      const { id } = req.params;
      const success = await cardService.deleteCard(id);
      if (!success) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async archiveCard(req, res, next) {
    try {
      const { id } = req.params;
      const { archived } = req.body;
      const card = await cardService.archiveCard(id, archived);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async moveCard(req, res, next) {
    try {
      const { id } = req.params;
      const { listId, position } = req.body;
      if (!listId) {
        return res.status(400).json({ error: { message: 'listId is required' } });
      }
      const card = await cardService.moveCard(id, listId, position);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async reorderCards(req, res, next) {
    try {
      const { sourceListId, destinationListId, cardIds } = req.body;
      if (!cardIds || !Array.isArray(cardIds)) {
        return res.status(400).json({ error: { message: 'cardIds array is required' } });
      }
      await cardService.reorderCards(sourceListId, destinationListId, cardIds);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  async updateCardLabels(req, res, next) {
    try {
      const { id } = req.params;
      const { labelIds } = req.body;
      if (!labelIds || !Array.isArray(labelIds)) {
        return res.status(400).json({ error: { message: 'labelIds array is required' } });
      }
      const card = await cardService.updateCardLabels(id, labelIds);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async updateCardMembers(req, res, next) {
    try {
      const { id } = req.params;
      const { memberIds } = req.body;
      if (!memberIds || !Array.isArray(memberIds)) {
        return res.status(400).json({ error: { message: 'memberIds array is required' } });
      }
      const card = await cardService.updateCardMembers(id, memberIds);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },

  async updateDueDate(req, res, next) {
    try {
      const { id } = req.params;
      const { dueDate } = req.body;
      const card = await cardService.updateDueDate(id, dueDate);
      if (!card) {
        return res.status(404).json({ error: { message: 'Card not found' } });
      }
      res.json(card);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cardController;

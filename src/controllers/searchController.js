const searchService = require('../services/searchService');

const searchController = {
  async searchCards(req, res, next) {
    try {
      const { q, boardId, labels, members, dueDate } = req.query;
      const filters = {
        query: q,
        boardId,
        labels: labels ? labels.split(',') : undefined,
        members: members ? members.split(',') : undefined,
        dueDate,
      };
      const results = await searchService.searchCards(filters);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;

const boardService = require('../services/boardService');

const boardController = {
  async getAllBoards(req, res, next) {
    try {
      const boards = await boardService.getAllBoards();
      res.json(boards);
    } catch (error) {
      next(error);
    }
  },

  async createBoard(req, res, next) {
    try {
      const { title, background } = req.body;
      if (!title) {
        return res.status(400).json({ error: { message: 'Title is required' } });
      }
      const board = await boardService.createBoard({ title, background });
      res.status(201).json(board);
    } catch (error) {
      next(error);
    }
  },

  async getBoardById(req, res, next) {
    try {
      const { id } = req.params;
      const board = await boardService.getBoardById(id);
      if (!board) {
        return res.status(404).json({ error: { message: 'Board not found' } });
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  },

  async updateBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { title, background } = req.body;
      const board = await boardService.updateBoard(id, { title, background });
      if (!board) {
        return res.status(404).json({ error: { message: 'Board not found' } });
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  },

  async deleteBoard(req, res, next) {
    try {
      const { id } = req.params;
      const success = await boardService.deleteBoard(id);
      if (!success) {
        return res.status(404).json({ error: { message: 'Board not found' } });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async getBoardLabels(req, res, next) {
    try {
      const { id } = req.params;
      const labels = await boardService.getBoardLabels(id);
      res.json(labels);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = boardController;

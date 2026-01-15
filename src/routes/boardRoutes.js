const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// GET /api/boards - List all boards
router.get('/', boardController.getAllBoards);

// POST /api/boards - Create a new board
router.post('/', boardController.createBoard);

// GET /api/boards/:id - Get board with all lists and cards
router.get('/:id', boardController.getBoardById);

// PUT /api/boards/:id - Update board
router.put('/:id', boardController.updateBoard);

// DELETE /api/boards/:id - Delete board
router.delete('/:id', boardController.deleteBoard);

// GET /api/boards/:id/labels - Get all labels for a board
router.get('/:id/labels', boardController.getBoardLabels);

module.exports = router;

const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// PUT /api/lists/reorder - Reorder lists within a board (MUST be before /:id routes)
router.put('/reorder', listController.reorderLists);

// POST /api/lists - Create a new list
router.post('/', listController.createList);

// PUT /api/lists/:id - Update list title
router.put('/:id', listController.updateList);

// DELETE /api/lists/:id - Delete a list
router.delete('/:id', listController.deleteList);

module.exports = router;

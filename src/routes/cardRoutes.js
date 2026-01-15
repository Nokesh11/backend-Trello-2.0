const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// PUT /api/cards/reorder - Reorder cards within lists (MUST be before /:id routes)
router.put('/reorder', cardController.reorderCards);

// POST /api/cards - Create a new card
router.post('/', cardController.createCard);

// GET /api/cards/:id - Get card details
router.get('/:id', cardController.getCardById);

// PUT /api/cards/:id - Update card
router.put('/:id', cardController.updateCard);

// DELETE /api/cards/:id - Delete card
router.delete('/:id', cardController.deleteCard);

// PUT /api/cards/:id/archive - Archive/unarchive card
router.put('/:id/archive', cardController.archiveCard);

// PUT /api/cards/:id/move - Move card to different list
router.put('/:id/move', cardController.moveCard);

// PUT /api/cards/:id/labels - Update card labels
router.put('/:id/labels', cardController.updateCardLabels);

// PUT /api/cards/:id/members - Update card members
router.put('/:id/members', cardController.updateCardMembers);

// PUT /api/cards/:id/due-date - Set/update due date
router.put('/:id/due-date', cardController.updateDueDate);

module.exports = router;

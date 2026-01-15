const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

// POST /api/checklists - Create a checklist
router.post('/', checklistController.createChecklist);

// PUT /api/checklists/:id - Update checklist
router.put('/:id', checklistController.updateChecklist);

// DELETE /api/checklists/:id - Delete checklist
router.delete('/:id', checklistController.deleteChecklist);

// POST /api/checklists/:id/items - Add item to checklist
router.post('/:id/items', checklistController.addChecklistItem);

// PUT /api/checklists/items/:itemId - Update checklist item
router.put('/items/:itemId', checklistController.updateChecklistItem);

// DELETE /api/checklists/items/:itemId - Delete checklist item
router.delete('/items/:itemId', checklistController.deleteChecklistItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

// POST /api/labels - Create a label
router.post('/', labelController.createLabel);

// PUT /api/labels/:id - Update a label
router.put('/:id', labelController.updateLabel);

// DELETE /api/labels/:id - Delete a label
router.delete('/:id', labelController.deleteLabel);

module.exports = router;

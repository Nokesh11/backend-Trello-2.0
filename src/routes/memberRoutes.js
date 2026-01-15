const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// GET /api/members - List all members
router.get('/', memberController.getAllMembers);

// GET /api/members/:id - Get member by ID
router.get('/:id', memberController.getMemberById);

module.exports = router;

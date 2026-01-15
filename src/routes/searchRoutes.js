const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/search?q=&boardId=&labels=&members=&dueDate=
router.get('/', searchController.searchCards);

module.exports = router;

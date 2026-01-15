const express = require('express');
const router = express.Router();

const boardRoutes = require('./boardRoutes');
const listRoutes = require('./listRoutes');
const cardRoutes = require('./cardRoutes');
const labelRoutes = require('./labelRoutes');
const memberRoutes = require('./memberRoutes');
const checklistRoutes = require('./checklistRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/boards', boardRoutes);
router.use('/lists', listRoutes);
router.use('/cards', cardRoutes);
router.use('/labels', labelRoutes);
router.use('/members', memberRoutes);
router.use('/checklists', checklistRoutes);
router.use('/search', searchRoutes);

module.exports = router;

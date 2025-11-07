const express = require('express');
const router = express.Router();
const { HandleGenerateNewShortUrl } = require('../controllers/url');

router.post('/', HandleGenerateNewShortUrl);

module.exports = router;
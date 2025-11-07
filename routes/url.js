const express = require('express');
const router = express.Router();
const { HandleGenerateNewShortUrl,handleGetAnalytics } = require('../controllers/url');

router.post('/', HandleGenerateNewShortUrl);
router.get('/analytics/:shortId',handleGetAnalytics)


module.exports = router;
const shortid = require('shortid');
const URL = require('../models/url');

async function HandleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'Url is required'});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.render('home',{id:`http://localhost:8001/url/${shortId} demo` });
    // return res.status(201).json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if(!result) return res.status(400).json({ error: 'Url not found'});
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    HandleGenerateNewShortUrl,
    handleGetAnalytics
};
const shortid = require('shortid');
const URL = require('../models/url');

async function HandleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(404).json({ error: 'Url is required'});
    const shortId = shortid(8);
    await URL.create({
        shortUrl: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.status(201).json({ shortUrl: shortId });
}

module.exports = {
    HandleGenerateNewShortUrl
};
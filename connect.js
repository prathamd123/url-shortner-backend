const mongoose = require('mongoose');

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
        await dropLegacyShortUrlIndex();
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw err;
    }
}
// Function to drop the legacy index 'shortUrl_1' from the 'urls' collection
async function dropLegacyShortUrlIndex() {
    const connection = mongoose.connection;
    const db = connection.db;
    if (!db) return;

    try {
        const collectionInfo = await db.listCollections({ name: 'urls' }).next();
        if (!collectionInfo) return;

        const collection = db.collection('urls');
        const indexes = await collection.indexes();
        const legacyIndex = indexes.find((index) => index.name === 'shortUrl_1');

        if (legacyIndex) {
            await collection.dropIndex('shortUrl_1');
            console.log('Dropped legacy index shortUrl_1');
        }
    } catch (error) {
        if (error.codeName !== 'IndexNotFound') {
            console.warn('Unable to drop legacy index shortUrl_1', error);
        }
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');

async function connectDB(url) {
return mongoose.connect(url)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
}

module.exports = connectDB;
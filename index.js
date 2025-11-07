const express = require('express');
const app = express();
const router = require('./routes/url');
const connectDB = require('./connect');
const port = 8001;


// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/shortUrl'
connectDB(url)
app.use('/url',router);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
const express = require('express');
const app = express();
const path = require('path');
const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const connectDB = require('./connect');
const port = 8001;
const URL = require('./models/url');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

const url = 'mongodb://127.0.0.1:27017/shortUrl'
connectDB(url)

app.use('/url',urlRouter);
app.use('/',staticRoute);


// app.get('/test',async(req,res)=>{
//     const allUsers = await URL.find({});
//     console.log(allUsers);
//     return res.render('home',{allUsers,});
// })

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
        $push:{
            visitHistory:{
             timestamp: Date.now(), 
             },
        },
    });
    console.log(entry);
    res.redirect(entry.redirectUrl)
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
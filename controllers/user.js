const User = require('../models/user');
const {v4 : uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
const { set } = require('mongoose');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    await User.create({ name, email, password });
    return res.status(201).render("/");
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user){
        return res.render("login",{error:"Invalid Credentials"});
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};
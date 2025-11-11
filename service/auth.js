const jwt = require('jsonwebtoken');
const secret = 'pratham$123@'

// const sessionIdToUserIdMap = new Map();


function setUser(user){
    return jwt.sign({
        _id : user._id,
        email: user.email,
    }, secret);
}

function getUser(token){
    // return sessionIdToUserIdMap.get(id);
    if(!token) return null;
    return jwt.verify(token,secret);
} 

module.exports = {
    setUser,
    getUser
};
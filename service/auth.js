const jwt = require('jsonwebtoken');
const secret = 'pratham$123@'

// const sessionIdToUserIdMap = new Map();


function setUser(user){
    // sessionIdToUserIdMap.set(id,user);
    // const payload = { ...user };
    return jwt.sign(user, secret);
}

function getUser(id){
    return sessionIdToUserIdMap.get(id);
} 

module.exports = {
    setUser,
    getUser
};
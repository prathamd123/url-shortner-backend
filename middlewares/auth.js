const {getUser} = require('../service/auth');
async function restrictToLoggedInUsersOnly(req, res, next) {
    // console.log(req)
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/login");
    }

    try {
        const user = getUser(userUid);
        if (!user) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    } catch (error) {
        // JWT verification failed (invalid/expired token)
        return res.redirect("/login");
    }
}

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;
    
    if (!userUid) {
        req.user = null;
        return next();
    }

    try {
        const user = getUser(userUid);
        req.user = user;
    } catch (error) {
        // JWT verification failed (invalid/expired token)
        req.user = null;
    }
    next();
}


module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth
};
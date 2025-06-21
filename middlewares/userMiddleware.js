

// middlewares/userMiddleware.js

const isUserLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next(); // user is logged in, allow access
    } else {
        res.redirect('/user/login'); // not logged in, redirect to login
    }
};

const publicUserMiddleware = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/user/home'); // already logged in, prevent access to login/register
    } else {
        next(); // not logged in, allow access
    }
};

module.exports = {isUserLoggedIn,publicUserMiddleware};

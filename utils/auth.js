const withAuth = (req, res, next) => {
    // Do stuff
    if (!req.session.loggedIn) {
        res.redirect('/login')
    } else {
        next();
    }
};

module.exports = { withAuth}
exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (!req.session.userType==="Admin" || !req.session.userType==="admin") {
        return res.redirect('/view-customer');
    }
    next();
};
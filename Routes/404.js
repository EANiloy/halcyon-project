///Route for showing page not found page for invalid routes
exports.get404 = (req, res, next) => {
    res.status(404).render('404/404', { pageTitle: 'Page not found' });
};
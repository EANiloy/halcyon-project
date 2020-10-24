const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const sequelize = require('./Database/db');
const session = require('express-session');
const csrf = require('csurf');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csrfProtection = csrf();
const flash = require('connect-flash');

///Defining the express application
const app = express();

///Setting up the view Engine
app.set('view engine', 'ejs');
app.set('views', 'Views');


///Setting up public folder path and body extraction feature
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

///Importing Routes
const authRoutes = require('./Routes/auth');
const homeRoutes = require('./Routes/home');
const errorRoutes = require('./Routes/404');

///Importing Models
const User = require('./Models/user');
const Customer = require('./Models/customer');


///Enabling sessions and creating session stores in Database
app.use(session({
    secret: 'secret-hash',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 1 * 60 * 60 * 1000,
        checkExpirationInterval: 15 * 60 * 1000
    })
}));

///Enabling Flash feature to show messages to the users
app.use(flash());

///Enabling Cross Site Request Forgery protection
app.use(csrfProtection);

///Asigning user login info and csrf token in session locals
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.userType = req.session.userType;
    res.locals.csrfToken = req.csrfToken();
    next();
});

/// Using imported Routes to handle requests
app.use(homeRoutes);
app.use(authRoutes);
app.use(errorRoutes.get404);

///Associations
User.hasMany(Customer);

///Syncing with the database and starting the app
sequelize.sync().then(() => {
    ///Listening request on port:80 (http)
    app.listen(80);
}).catch(err => {
    console.log(err);
})

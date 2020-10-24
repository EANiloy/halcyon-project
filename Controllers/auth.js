const User = require('../Models/user');
const bcrypt = require('bcrypt');
exports.getLogin = (req, res, next) => {
    let message = req.flash('message');
    if (message.length <= 0) {
        message = req.flash('error');
        if (message.length <= 0) {
            message = null;
            props = 'outline:none;';
        }
        else {
            props = 'display:block;';
        }
    }
    else {
        props = 'display:block;outline-color:darkgreen;';
    }
    res.render('auth/login', {
        pageTitle: "Login",
        message: message,
        props:props
    });
};

exports.postLogin = (req, res, next) => {
    const username = req.body.userName;
    const password = req.body.password;
    User.findOne({ where: { userName: username } }).then(user => {
        if (!user) {
            req.flash('error', 'Invalid Username');
            req.session.save(() => {
                return res.redirect('/login');
            });
        }
        bcrypt.compare(password, user.password).then(matched => {
            if (matched) {
                req.session.isLoggedIn = true;
                req.session.userType= user.userType
                return req.session.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/');
                });
            }
            req.flash('error', 'Invalid Password');
            req.session.save(() => {
                return res.redirect('/login');
            });
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
    
    let message = req.flash('message');
    if (message.length <= 0) {
        message = req.flash('error');
        if (message.length <= 0) {
            message = null;
            props = 'outline:none;';
        }
        else {
            props = 'display:block;';
        }
    }
    else {
        props='display:block;outline-color:darkgreen;'
    }
    res.render('auth/signup', {
        pageTitle: "Sign Up",
        message: message,
        props:props
    });
};

exports.postSignup = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const phnNo = req.body.phnNo;
    User.findOne({ where: { userName: userName, email: email } }).then((user) => {
        if (user) {
            req.flash('error', 'User already exists');
            req.session.save(() => {
                return res.redirect('/signup');
            });
        }
        else {
            bcrypt.hash(password, 12).then(hashedPassword => {
                User.create({
                    userName: userName,
                    email: email,
                    phnNo: phnNo,
                    password: hashedPassword,
                }).then(() => {
                    req.flash('message', 'User Created Successfully');
                    req.session.save(() => {
                        return res.redirect('/login');
                    });
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
    
};
const Customers = require('../Models/customer');

exports.getIndex = (req, res, next) => {
    res.render('home', {
        pageTitle:'Home'
    })
};

exports.getCreateCustomer = (req, res, next) => {
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
    res.render('Customers/create', {
        pageTitle: "Create Customer",
        props: props,
        message: message
    });
};
exports.getViewCustomer = (req, res, next) => {
    Customers.findAll().then(customers => {
        res.render('Customers/view', {
            pageTitle: "Customers",
            customers: customers
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postCreateCustomer = (req, res, next) => {
    const name = req.body.name;
    const phnNo = req.body.phnNo;
    const imageurl = req.body.imageUrl;
    const address = req.body.address;
    Customers.findOne({ where: { name: name, phnNo: phnNo } }).then(customer => {
        if (customer) {
            req.flash('error', 'Customer already exists');
            req.session.save(() => {
                return res.redirect('/create-customer');
            });
        }
        else {
            Customers.create({
                name: name,
                phnNo: phnNo,
                imageUrl: imageurl,
                address: address
            }).then(() => {
                return res.redirect('/view-customer');
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
};

exports.getUpdateCustomer = (req, res, next) => {
    const customerId = req.query.id;
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
    Customers.findOne({where:{id:customerId}}).then(customer => {
        res.render('Customers/update', {
            pageTitle: "UpdateCustomer",
            customer: customer,
            props: props,
            message:message
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postUpdateCustomer = (req, res, next) => {
    const name = req.body.name;
    const phnNo = req.body.phnNo;
    const imageUrl = req.body.imageUrl;
    const address = req.body.address;
    const customerId = req.body.id;
    console.log(customerId);
    Customers.update({
        name: name,
        phnNo: phnNo,
        imageUrl: imageUrl,
        address: address
    }, { where: { id: customerId } }).then(() => {
        return res.redirect('/view-customer');
    }).catch(err => {
        console.log(err);
    });
}


exports.postDeleteCustomer = (req, res, next) => {
    const customerId = req.body.id;
    Customers.destroy({ where: {id: customerId} }).then(() => {
        res.redirect('/view-customer');
    })
}
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET signup
router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup');
});

//POST signup
router.post('/signup', isLoggedOut, (req, res) => {
    const { fullName, email, password } = req.body;

    //Checking if all fields contain data
    if (!fullName || !email || !password){
        res.render('auth/signup', { errorMessage: 'Please enter data in all fields. '});
        return;
    }

    //Creating new user (bycrpt for password)
    bcrypt 
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashPassword => {
            return User.create({
                email,
                password: hashPassword,
                fullName
            });
        })
        .then(user => {
            console.log(`New user created: ${user}`)
            res.redirect('/auth/login');
        })
        .catch(err => console.log(err));
});

//GET login
router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login');
});

//POST login
router.post('/login', isLoggedOut, (req, res) => {
    const { email, password } = req.body;

    //Checking if all fields contain data
    if (!email || !password){
        res.render('auth/login', { errorMessage: 'Please enter data in all fields. '});
        return;
    }
    
    User.findOne({ email })
        .then(user => {
            if(!user) {
                res.render('auth/login', { errorMessage: 'This email has not been registered.'});
                return;
            }
            else if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect('/');
            }
            else {
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
                return;
            }
        })
        .catch(err => console.log(err));
});

//GET logout
router.get('/logout', isLoggedIn, (req, res) => {
    res.render('auth/logout');
});

//POST logout
router.post('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/');
    });
});

module.exports = router;

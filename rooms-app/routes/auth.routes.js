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
router.get('/login', (req, res) => {
    res.render('auth/login');
})
module.exports = router;

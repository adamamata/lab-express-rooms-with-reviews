const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET create
router.get('/create', (req, res) => {
    res.render('rooms/create');
});

//POST create
router.post('/create', isLoggedIn, (req, res) => {
    const { name, description, imageUrl } = req.body;

    if (!name || !description) {
        res.render('rooms/create', { errorMessage: 'Please add a name and description'});
    }
    else {
        Room.create({ name, description, imageUrl })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
    }
})

module.exports = router;
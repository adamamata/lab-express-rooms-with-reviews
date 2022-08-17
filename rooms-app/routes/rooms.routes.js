const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET create
router.get('/create', (req, res) => {
    User.find()
        .then((allUsers) => {
            res.render('rooms/create', { allUsers });
        })
        .catch(err => console.log(err)); 
});

//POST create
router.post('/create', isLoggedIn, (req, res) => {
    const { name, description, imageUrl, owner } = req.body;

    if (!name || !description) {
        res.render('rooms/create', { errorMessage: 'Please add a name and description'});
    }
    else {
        Room.create({ name, description, imageUrl, owner })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
    }
});

//GET edit
router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    Room.findById(id)
        .then((room) => {
            res.render('rooms/edit', room);
        })
        .catch(err => console.log(err));
});

//POST edit
router.post('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { name, description, imageUrl} = req.body;

    if (!name || !description){
        res.render('rooms/edit', { errorMessage: 'Please add a name and description'});
    }
    else {
        Room.findByIdAndUpdate(id, { name, description, imageUrl})
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
    }
});

//POST delete
router.post('/:id/delete', (req ,res) => {
    const { id } = req.params;

    Room.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
});

module.exports = router;
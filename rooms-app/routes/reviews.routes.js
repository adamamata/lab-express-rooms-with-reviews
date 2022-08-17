const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET :id
router.get('/:id/review', (req, res) => {
    const { id } = req.params;

    Room.findById(id)
        .then((room) => {
            res.render('reviews/create', room);
        })
        .catch(err => console.log(err));
});

//POST :id   //Need to finish this
router.post('/:id/review', (req, res) => {
});

module.exports = router;
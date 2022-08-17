const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET :id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Room.findById(id)
        .then((room) => {
            res.render('reviews/create', room);
        })
        .catch(err => console.log(err));
});

//POST :id
router.post('/:id', (req, res) => {
    const { id } = req.params;
    const { review } = req.body;

    //Need to finish this
});

module.exports = router;
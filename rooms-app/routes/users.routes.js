const { isLoggedIn } = require("../middleware/route-guard");

const router = require("express").Router();

//GET user-profile
router.get('/user-profile', isLoggedIn, (req, res) => {
    const { currentUser } = req.session;
    res.render('users/user-profile', { currentUser });
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

//GET home
router.get("/", (req, res, next) => {
  const { currentUser } = req.session;
  res.render("index", { currentUser });
});

module.exports = router;

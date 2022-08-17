const router = require("express").Router();
const Room = require("../models/Room.model");

//GET home
router.get("/", (req, res, next) => {
  const { currentUser } = req.session;
  Room.find()
    .then((allRooms) => {
      res.render("index", { currentUser, allRooms, });
    })
    .catch(err => console.log(err));
});

module.exports = router;

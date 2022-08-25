const router = require("express").Router();
const mongoose = require("mongoose");
//const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");


router.post('/profile', (req, res, next) => {
    const {username, email, password, imageProfile, country} = req.body;

    User.create({username, email, password, imageProfile, country})
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/profile", (req, res, next) => {
    const {userId} = req.params;

    User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err))
});

router.put("/profile/edit", (req,res,next) => {
    const {userId} = req.params;
    const {username, email, password, imageProfile, country} = req.body;

    User.findByIdAndUpdate(
        userId,
			{ username, email, password, imageProfile, country },
			{ new: true }
    )
        .then((user) => res.status(200).json(user))
        .catch((err) => res.json(err))
});

router.delete("/profile/delete", (req, res, next) => {
    const {userId} = req.params;

    User.findByIdAndRemove(userId)
    .then(() => res.redirect("/memories"))
    .catch((err) => res.json(err))
});


module.exports = router;
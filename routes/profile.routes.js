const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


router.get("/profile/:userId", (req, res, next) => {
    const {userId} = req.params;

    User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err))
});

router.put("/profile/edit/:userId", (req,res,next) => {
    const {userId} = req.params;
    const {username, email, imageProfile, password} = req.body;

    User.findByIdAndUpdate(
        userId,
			{ username, email, imageProfile, password },
			{ new: true }
    )
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err))
});

router.delete("/profile/delete/:userId", (req, res, next) => {
    const {userId} = req.params;

    User.findByIdAndRemove(userId)
    .then(() => res.json({message: "User deleted"}))
    .catch((err) => res.json(err))
});


module.exports = router;
const router = require("express").Router();
const mongoose = require("mongoose");
const Dance = require("../models/Dance.model");
const Game = require("../models/Game.model"); 

router.get("/memories", async (req, res, next) => {
    try {
        const dances = await Dance.find();
        const games = await Game.find();

        res.status(200).json({ dances, games})

    } catch (error) {
        next(error)
    }
})


module.exports = router;
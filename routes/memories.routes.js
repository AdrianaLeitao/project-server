const router = require("express").Router();
const mongoose = require("mongoose");
const Dance = require("../models/Dance.model");
const Game = require("../models/Game.model"); 

router.get("/memories", (req, res, next) => {
    Dance.find()
    .populate('dances')
    .then((dances) => res.status(200).json(dances))
    .catch((err) => res.json(err))
});

router.get("/memories", (req, res, next) => {
    Game.find()
    .populate('games')
    .then((games) => res.status(200).json(games))
    .catch((err) => res.json(err))
});

router.get("/memories", (req, res, next) => {
    Dance.findById(danceId)
    .populate('dances')
    .then((dances) => res.status(200).json(dances))
    .catch((err) => res.json(err))
});

router.get("/memories", (req, res, next) => {
    Game.findById(gameId)
    .populate('games')
    .then((games) => res.status(200).json(games))
    .catch((err) => res.json(err))
});

module.exports = router;
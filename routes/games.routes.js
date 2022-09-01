const router = require("express").Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");

router.post('/games', (req, res, next) => {
    const {img, name, description, howPlay, creator} = req.body;

    Game.create({img, name, description, howPlay})
    .then((newGame) => {
        return Game.findByIdAndUpdate(gamesId, {$push : {games: newGame._id}});
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get('/games', (req, res, next) => {
    Game.find()
    .then((game) => res.status(200).json(game))
    .catch((err) => res.json(err))
});

router.get('/games/:gameId', (req, res, next) => {
    Game.findById(gameId)
    .then((game) => res.status(200).json(game))
    .catch((err) => res.json(err))
});

router.put('/games/edit/:gameId', (req, res, next) => {
    const {gameId} = req.params;
    const {img, name, description, howPlay} = req.body;

    Game.findByIdAndUpdate(gameId, {img, name, description, howPlay }, {new: true})
    .then((game) => res.status(200).json(game))
    .catch((err) => res.json(err))
});

router.delete('/games/delete/:gameId', (req, res, next) => {
    const {gameId} = req.params;

    Game.findByIdAndRemove(gameId)
    .then(() => res.status(200).json({message: `The game with id ${gameId} was deleted.`}))
    .catch((err) => res.json(err))
});

module.exports = router;
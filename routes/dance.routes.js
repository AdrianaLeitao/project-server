const router = require("express").Router();
const mongoose = require("mongoose");
const Dance = require("../models/Dance.model");

router.post('/dance', (req, res, next) => {
    const {image, name, description, video, duration} = req.body;

    Dance.create({image, name, description, video, duration})
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get('/dance', (req, res, next) => {
    Dance.find()
    .then((dance) => res.status(200).json(dance))
    .catch((err) => res.json(err))
});

router.get('/dance/:danceId', (req, res, next) => {
    Dance.findById(danceId)
    .then((dance) => res.status(200).json(dance))
    .catch((err) => res.json(err))
});

router.put('/dance/edit/:danceId', (req, res, next) => {
    const {danceId} = req.params;
    const {image, name, description, video, duration} = req.body;

    Dance.findByIdAndUpdate(danceId, {image, name, description, video, duration}, {new: true})
    .then((dance) => res.status(200).json(dance))
    .catch((err) => res.json(err))
});

router.delete('/dance/delete/:danceId', (req, res, next) => {
    const {danceId} = req.params;

    Dance.findByIdAndRemove(danceId)
    .then(() => res.status(200).json({message: `The dance with id ${danceId} was deleted.`}))
    .catch((err) => res.json(err))
});

module.exports = router;
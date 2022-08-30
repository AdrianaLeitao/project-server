const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

const {isAuthenticated} = require("../middleware/jwt.middleware");

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("the token: (or not)", req.payload);

  res.status(200).json(req.payload);
});

router.post("/signup", (req, res) => {
  const { username, email, password, country } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email." });
  }

  if (!country) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your country." });
  }


  if (password.length < 8) {
    return res
      .status(400)
      .json({ errorMessage: "Your password needs to be at least 8 characters long." });
  }

  User.findOne({ username }).then((found) => {
    if (found) {
      return res
        .status(400)
        .json({ errorMessage: "Username already taken." });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          email,
          password: hashedPassword,
          country,
        });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }

        const { _id, username } = user;

        const payload = { _id, username };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '14d',
        })

        return res.status(200).json({ authToken: authToken});
      });
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;
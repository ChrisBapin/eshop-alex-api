const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/userModel");

//Cree a compte utilisateur
router.post("/sign-up", async (req, res) => {
  try {
    // console.log(req.body.password);
    const password = req.body.password;
    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(password + salt).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      token: token,
      salt: salt,
    });
    await newUser.save();
    res.json({
      _id: newUser._id,
      token: newUser.token,
      password: newUser.password,
      username: newUser.username,
      usermail: newUser.email,
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        user.password ===
        SHA256(req.body.password + user.salt).toString(encBase64)
      ) {
        res.json({
          _id: user._id,
          token: user.token,
          account: {
            username: user.username,
            usermail: user.email,
            poster_profile: user.poster_profile,
          },
        });
      } else {
        res.json("Le mot de passe est incorrect");
      }
    } else {
      res.json("Erreur dans l'adresse email");
    }
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;

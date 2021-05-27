require("dotenv").config();

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const showModel = require("../models/show");

// Middelware
const accessToken = (req, res, next) => {
  const token = req.headers["auth-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ mensaje: "The token is invalid" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(500).send({
      mensaje: "A Token is needed",
    });
  }
};

// EndPoint
router.post("/create-show", accessToken, async (req, res) => {
  const { name, season, actor, director } = req.body;

  try {
    // validate show
    const show = await showModel.findOne({ name, season, actor, director });
    if (show) return res.status(500).json("The show already exists");

    // save show
    const showSave = new showModel({ name, season, actor, director });
    await showSave.save();
    return res
      .status(200)
      .json(
        `the show ${showSave.name} was created`
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

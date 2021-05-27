require("dotenv").config();

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const actorModel = require("../models/actor");

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
router.post("/create-actor", accessToken, async (req, res) => {
  const { firstname, lastname, age } = req.body;

  try {
    // validate actor
    const actor = await actorModel.findOne({ firstname, lastname, age });
    if (actor) return res.status(500).json("The actor already exists");

    // save actor
    const actorSave = new actorModel({ firstname, lastname, age });
    await actorSave.save();
    return res
      .status(200)
      .json(
        `the actor ${actorSave.firstname} ${actorSave.lastname} was created`
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

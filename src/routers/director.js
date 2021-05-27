require("dotenv").config();

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const directorModel = require("../models/director");

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
router.post("/create-director", accessToken, async (req, res) => {
  const { firstname, lastname, age } = req.body;

  try {
    // validate director
    const director = await directorModel.findOne({ firstname, lastname, age });
    if (director) return res.status(500).json("The director already exists");

    // save director
    const directorSave = new directorModel({ firstname, lastname, age });
    await directorSave.save();
    return res
      .status(200)
      .json(
        `the director ${directorSave.firstname} ${directorSave.lastname} was created`
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

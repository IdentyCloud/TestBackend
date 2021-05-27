require("dotenv").config();

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const movieModel = require("../models/movie");

// Middelware
const accessToken = (req, res, next) => {
  const token = req.headers["auth-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(400).json({ mensaje: "The token is invalid" });
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
router.post("/create-movie", accessToken, async (req, res) => {
  const { name, director, actor } = req.body;

  try {
    // validate movie
    const movie = await movieModel.findOne({ name, director, actor });
    if (movie) return res.status(500).json("The movie already exists");

    // save movie
    const movieSave = new movieModel({ name, director, actor });
    await movieSave.save();
    return res.status(200).json(`the movie ${movieSave.name} was created`);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/filter/", accessToken, async (req, res) => {
  const { name } = req.query;
  try {
    // filter movie
    const movie = await movieModel.find({
      name: { $eq: name },
    });
    return res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/filter/", accessToken, async (req, res) => {
  const { name } = req.query;
  try {
    // filter movie
    const movie = await movieModel.find({
      name: { $eq: name },
    });
    return res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/sort/", accessToken, async (req, res) => {
  const order = req.query.order;

  try {
    // sort movie
    if (order == "ascendant")
      return res.status(200).json(await movieModel.find().sort({ name: 1 }));
    else
      return res.status(200).json(await movieModel.find().sort({ name: -1 }));
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

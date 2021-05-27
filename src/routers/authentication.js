require("dotenv").config();

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const userModel = require("../models/users");

// EndPoint
router.post("/create-user", async (req, res) => {
  const { username, password } = req.body;

  try {

    // validate user
    const user = await userModel.findOne({ username });
    if (user) return res.status(500).json("The user already exists");
    
    // save user
    const userSave = new userModel({ username, password });
    userSave.password = bcrypt.hashSync(password, 10);
    await userSave.save();
    return res.status(200).json(`the user ${userSave.username} was created`);
  
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/authentication", async (req, res) => {
  const { username, password } = req.body;

  try {
    // validate user
    const user = await userModel.findOne({ username });
    if (!user) return res.status(500).json("The user is incorrect");

    // validate password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(500).json("The password is incorrect");
    } else {
      // generate Token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res
        .status(200)
        .header("auth-token", token)
        .json(`The user ${user.username} is correct.`);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

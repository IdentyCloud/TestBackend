const { Schema, model } = require("mongoose");

// define schema
const DirectorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: String
  },
});

// export module
module.exports = model("Director", DirectorSchema);

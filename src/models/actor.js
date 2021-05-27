const { Schema, model } = require("mongoose");

// define schema
const ActorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
});

// export module
module.exports = model("Actor", ActorSchema);

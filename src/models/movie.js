const { Schema, model } = require("mongoose");

// define schema
const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: "Actor",
    required: true,
  },
  actor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
  ],
});

// export module
module.exports = model("Movie", MovieSchema);

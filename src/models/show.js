const { Schema, model } = require("mongoose");

// define schema
const ShowSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  season: [
    {
      name: {
        type: String,
        required: true,
      },
      episode: [
        {
          number: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  director: {
    type: Schema.Types.ObjectId,
    ref: "Director",
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
module.exports = model("Show", ShowSchema);

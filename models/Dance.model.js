const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const danceSchema = new Schema(
  {
    image: { 
        type: [String], 
        default: '', 
      },
      name: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      video: { type: String },
      duration: {
        type: String,
        enum: ("Medium(0 - 5 minutes)", "Long(5 - 10 minutes)")
      },
  },
  {
    timestamps: true,
  }
);

const Dance = model("Dance", danceSchema);

module.exports = Dance;
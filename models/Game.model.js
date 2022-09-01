const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    img: [{ type: String }],
    name: { 
    type: String, 
    required: true 
  },
   description: { 
    type: String, 
    required: true 
  },
   howPlay: { 
    type: String, 
    required: true 
  },
},
  {
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;

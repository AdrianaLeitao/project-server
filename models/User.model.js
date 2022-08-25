const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address'] 
    },
    password: { 
      type: String, 
      required: true 
    },
    imageProfile: { 
      type: String, 
      default: '' 
    },
    country: { 
      type: String,
      required: true 
    },
    dance: [{ type: Schema.Types.ObjectId, ref: "Dance" }],
    games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

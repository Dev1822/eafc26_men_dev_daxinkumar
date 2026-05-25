const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
      unique: true,
    },

    Rank: String,
    Name: {
      type: String,
      required: true,
      trim: true,
    },

    GENDER: {
      type: String,
      enum: ["M", "F"],
    },

    OVR: String,
    PAC: String,
    SHO: String,
    PAS: String,
    DRI: String,
    DEF: String,
    PHY: String,

    // Pace
    Acceleration: String,
    "Sprint Speed": String,

    // Shooting
    Positioning: String,
    Finishing: String,
    "Shot Power": String,
    "Long Shots": String,
    Volleys: String,
    Penalties: String,

    // Passing
    Vision: String,
    Crossing: String,
    "Free Kick Accuracy": String,
    "Short Passing": String,
    "Long Passing": String,
    Curve: String,

    // Dribbling
    Dribbling: String,
    Agility: String,
    Balance: String,
    Reactions: String,
    "Ball Control": String,
    Composure: String,

    // Defending
    Interceptions: String,
    "Heading Accuracy": String,
    "Def Awareness": String,
    "Standing Tackle": String,
    "Sliding Tackle": String,

    // Physical
    Jumping: String,
    Stamina: String,
    Strength: String,
    Aggression: String,

    // Player Info
    Position: String,
    "Weak foot": String,
    "Skill moves": String,
    "Preferred foot": {
      type: String,
      enum: ["Left", "Right"],
    },

    Height: String,
    Weight: String,

    "Alternative positions": [String],

    Age: String,
    Nation: String,
    League: String,
    Team: String,

    "play style": [String],

    url: String,
    card: String,

    // Goalkeeping
    "GK Diving": {
      type: String,
      default: null,
    },
    "GK Handling": {
      type: String,
      default: null,
    },
    "GK Kicking": {
      type: String,
      default: null,
    },
    "GK Positioning": {
      type: String,
      default: null,
    },
    "GK Reflexes": {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
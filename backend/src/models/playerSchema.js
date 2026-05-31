const mongoose = require('mongoose');

const statValidator = {
  validator: function(v) {
    if (v === null || v === undefined || v === '') return false;
    const num = Number(v);
    return !isNaN(num) && num >= 1 && num <= 99;
  },
  message: props => `${props.value} is not a valid stat rating. Must be a numeric string between 1 and 99.`
};

const ageValidator = {
  validator: function(v) {
    if (v === null || v === undefined || v === '') return false;
    const num = Number(v);
    return !isNaN(num) && num >= 15 && num <= 55;
  },
  message: props => `${props.value} is not a valid age. Must be a numeric string between 15 and 55.`
};

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

    OVR: { type: String, required: true, validate: statValidator },
    PAC: { type: String, required: true, validate: statValidator },
    SHO: { type: String, required: true, validate: statValidator },
    PAS: { type: String, required: true, validate: statValidator },
    DRI: { type: String, required: true, validate: statValidator },
    DEF: { type: String, required: true, validate: statValidator },
    PHY: { type: String, required: true, validate: statValidator },

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

    Age: { type: String, required: true, validate: ageValidator },
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
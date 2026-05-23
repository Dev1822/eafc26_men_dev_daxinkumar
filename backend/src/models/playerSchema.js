const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    Id: { type: String, required: true, unique: true },
    rank: { type: Number },
    name: { type: String, required: true, index: true },
    gender: { type: String, enum: ['M', 'F'] },
    ovr: { type: Number, index: true },
    pac: { type: Number },
    sho: { type: Number },
    pas: { type: Number },
    dri: { type: Number },
    def: { type: Number },
    phy: { type: Number },
    // Pace stats
    acceleration: { type: Number },
    sprintSpeed: { type: Number },
    // Shooting stats
    positioning: { type: Number },
    finishing: { type: Number },
    shotPower: { type: Number },
    longShots: { type: Number },
    volleys: { type: Number },
    penalties: { type: Number },
    
    // Passing stats
    vision: { type: Number },
    crossing: { type: Number },
    freeKickAccuracy: { type: Number },
    shortPassing: { type: Number },
    longPassing: { type: Number },
    curve: { type: Number },
    
    // Dribbling stats
    dribbling: { type: Number },
    agility: { type: Number },
    balance: { type: Number },
    reactions: { type: Number },
    ballControl: { type: Number },
    composure: { type: Number },
    
    // Defending stats
    interceptions: { type: Number },
    headingAccuracy: { type: Number },
    defAwareness: { type: Number },
    standingTackle: { type: Number },
    slidingTackle: { type: Number },
    
    // Physical stats
    jumping: { type: Number },
    stamina: { type: Number },
    strength: { type: Number },
    aggression: { type: Number },
    
    // GK stats
    gkDiving: { type: Number },
    gkHandling: { type: Number },
    gkKicking: { type: Number },
    gkPositioning: { type: Number },
    gkReflexes: { type: Number },
    
    position: { type: String, index: true },
    weakFoot: { type: Number },
    skillMoves: { type: Number },
    preferredFoot: { type: String },
    height: { type: String },
    weight: { type: String },
    alternativePositions: [{ type: String }],
    age: { type: Number, index: true },
    nation: { type: String, index: true },
    league: { type: String, index: true },
    team: { type: String, index: true },
    playStyles: [{ type: String }],
    url: { type: String },
    cardImage: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);

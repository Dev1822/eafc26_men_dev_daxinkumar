const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true },
    rank: { type: String },
    Name: { type: String, required: true, index: true },
    gender: { type: String, enum: ['M', 'F'] },
    ovr: { type: String, index: true },
    pac: { type: String },
    sho: { type: String },
    pas: { type: String },
    dri: { type: String },
    def: { type: String },
    phy: { type: String },
    // Pace stats
    acceleration: { type: String },
    sprintSpeed: { type: String },
    // Shooting stats
    positioning: { type: String },
    finishing: { type: String },
    shotPower: { type: String },
    longShots: { type: String },
    volleys: { type: String },
    penalties: { type: String },
    
    // Passing stats
    vision: { type: String },
    crossing: { type: String },
    freeKickAccuracy: { type: String },
    shortPassing: { type: String },
    longPassing: { type: String },
    curve: { type: String },
    
    // Dribbling stats
    dribbling: { type: String },
    agility: { type: String },
    balance: { type: String },
    reactions: { type: String },
    ballControl: { type: String },
    composure: { type: String },
    
    // Defending stats
    interceptions: { type: String },
    headingAccuracy: { type: String },
    defAwareness: { type: String },
    standingTackle: { type: String },
    slidingTackle: { type: String },
    
    // Physical stats
    jumping: { type: String },
    stamina: { type: String },
    strength: { type: String },
    aggression: { type: String },
    
    // GK stats
    gkDiving: { type: String },
    gkHandling: { type: String },
    gkKicking: { type: String },
    gkPositioning: { type: String },
    gkReflexes: { type: String },
    
    position: { type: String, index: true },
    weakFoot: { type: String },
    skillMoves: { type: String },
    preferredFoot: { type: String },
    height: { type: String },
    weight: { type: String },
    alternativePositions: [{ type: String }],
    age: { type: String, index: true },
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

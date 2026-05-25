const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
    {
        // Basic Info
        ID: {
            type: Number,
            required: true,
            unique: true,
            index: true
        },

        rank: {
            type: Number
        },

        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        gender: {
            type: String,
            enum: ['M', 'F']
        },

        age: {
            type: Number,
            index: true
        },

        nation: {
            type: String,
            index: true
        },

        league: {
            type: String,
            index: true
        },

        team: {
            type: String,
            index: true
        },

        // Overall Stats
        ovr: {
            type: Number,
            index: true
        },

        pac: Number,
        sho: Number,
        pas: Number,
        dri: Number,
        def: Number,
        phy: Number,

        // Pace
        acceleration: Number,
        sprintSpeed: Number,

        // Shooting
        positioning: Number,
        finishing: Number,
        shotPower: Number,
        longShots: Number,
        volleys: Number,
        penalties: Number,

        // Passing
        vision: Number,
        crossing: Number,
        freeKickAccuracy: Number,
        shortPassing: Number,
        longPassing: Number,
        curve: Number,

        // Dribbling
        dribbling: Number,
        agility: Number,
        balance: Number,
        reactions: Number,
        ballControl: Number,
        composure: Number,

        // Defending
        interceptions: Number,
        headingAccuracy: Number,
        defAwareness: Number,
        standingTackle: Number,
        slidingTackle: Number,

        // Physical
        jumping: Number,
        stamina: Number,
        strength: Number,
        aggression: Number,

        // Goalkeeping
        gkDiving: {
            type: Number,
            default: 0
        },

        gkHandling: {
            type: Number,
            default: 0
        },

        gkKicking: {
            type: Number,
            default: 0
        },

        gkPositioning: {
            type: Number,
            default: 0
        },

        gkReflexes: {
            type: Number,
            default: 0
        },

        // Player Meta
        position: {
            type: String,
            index: true
        },

        alternativePositions: [
            {
                type: String
            }
        ],

        weakFoot: {
            type: Number,
            min: 1,
            max: 5
        },

        skillMoves: {
            type: Number,
            min: 1,
            max: 5
        },

        preferredFoot: {
            type: String,
            enum: ['Right', 'Left']
        },

        height: {
            type: String
        },

        weight: {
            type: String
        },

        playStyles: [
            {
                type: String
            }
        ],

        // Media
        url: {
            type: String
        },

        cardImage: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Player', playerSchema);
const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Player", playerSchema);
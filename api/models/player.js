const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    }
});

module.exports = mongoose.model("Player", playerSchema);
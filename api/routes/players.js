const express = require("express");
const mongoose = require("mongoose");
const Player = require("../models/player");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        message: "Players - GET",
        method: req.method
    })
});

router.post("/", (req, res, next) => {
    res.json({
        message: "Players - POST",
        method: req.method
    })
});

router.get("/:playerId", (req, res, next) => {
    const playerId = req.params.playerId;
    Player.findById(playerId)
    .select("name _id")
    .populate("team", "name")
    .exec()
    .then(player => {
        if(!player){
            console.log(player);
            return res.status(404).json({
                message: "Player Not Found"
            })
        }

        res.status(201).json({
            player: player
        })
    })
    .catch(err => {
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
});

router.patch("/:playerId", (req, res, next) => {
    const playerId = req.params.playerId;
    res.json({
        message: "Players - PATCH by ID",
        id: playerId,
        method: req.method
    })
});

router.delete("/:playerId", (req, res, next) => {
    const playerId = req.params.playerId;
    
    Player.deleteOne({
        _id: playerId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Player Deleted",
            request: {
                method: "GET",
                url: "http://localhost:3000/players/" + playerId
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
});





module.exports = router;
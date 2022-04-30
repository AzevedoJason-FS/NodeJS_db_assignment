const express = require("express");
const mongoose = require("mongoose");
const Player = require("../models/player");
const Messages = require("../../messages/messages");
const player = require("../models/player");
const router = express.Router();

// ============ GET ============ VALIDATION NOT WORKING
router.get("/", (req, res, next) => {
    Player.find()
    .select("name _id")
    .populate("team", "name")
    .exec()
    .then(result => {
        console.log(result);
        if(result.length === 0){
            return res.status(406).json({
                message: Messages.player_all_not_found
            })
        }
        res.status(200).json({
            message: "Players",
            Player: {
                name: result,
            metadata:{
                method: req.method,
                host: req.hostname
            }
            }
        })
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

// ============ POST ============ ALL DONE
router.post("/", (req, res, next) => {
    Player.find({
        name: req.body.name
    })
    .select("name _id")
    .populate("team", "name")
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: Messages.player_create_not_found
            })
        }

        const newPlayer = new Player({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            team: req.body.team
        });
        
        //Write to Database
        newPlayer.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Player Saved",
                    Player: {
                        name: result.name,
                        id: result._id,
                        team: result.team,
                    metadata:{
                        method: req.method,
                        host: req.hostname
                    }
                    }
                })
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({
                    error: {
                        message: err.message
                    }
                })
            });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({
            error:{
                message: "Unable to save record with title: "+ req.body.name
            }
        })
    })
});

// ============ GET BY ID ============ ALL DONE
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
                message: Messages.player_not_found
            })
        }
        res.status(200).json({
            message: "Player found",
            Player: player
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

// ============ PATCH ============ ALL DONE
router.patch("/:playerId", (req, res, next) => {
    const playerId = req.params.playerId;
    const updatedPlayer = {
        name: req.body.name,
    };

    Player.updateOne({
        _id: playerId
    }, {
        $set: updatedPlayer
    })
    .select("name _id")
    .populate("team", "name")
    .exec()
    .then(result => {
        if(result.matchedCount == 0){
            return res.status(404).json({
                message: Messages.player_update_not_found
            })
        }
        res.status(200).json({
            message: "Player Updated",
            team: {
               result
            },
            metadata:{
                host: req.hostname,
                method: req.method
            }
        })
    })
      .catch(err => {
          res.status(500).json({
              error: {
                  message: err.message,
              }
          })
      });
});

// ============ DELETE BY ID ============ VALIDATION NOT WORKING
router.delete("/:playerId", (req, res, next) => {
    const playerId = req.params.playerId;
    
    Player.findByIdAndDelete({
        _id: playerId
    })
    .select("name _id")
    .populate("team", "name")
    .exec()
    .then(player => {
             if(!player){
                 return res.status(406).json({
                     message: Messages.player_delete_not_found
                 })
             }
        res.status(200).json({
            message: "Player Successfully Deleted",
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
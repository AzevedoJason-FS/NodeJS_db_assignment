const express = require("express");
const mongoose = require("mongoose");
const Team = require("../models/team");
const router = express.Router();

//GET all teams
router.get("/", (req, res, next) => {
    Team.find().lean()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Teams",
            Team: {
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

router.post("/", (req, res, next) => {
    const newTeam = new Team({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    })

//Write to Database
newTeam.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Team Saved",
            Team: {
                name: result.name,
                id: result._id,
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

//GET Team by ID
router.get("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;

    Team.findById(teamId)        
        .lean()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Team Successfully Found",
                Team: {
                    name: result.name,
                    id: result._id,
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

//PATCH(update) team by ID
router.patch("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;
   
    const updatedTeam = {
        name: req.body.name,
    };

    Team.updateOne({
        _id: teamId
    }, {
        $set: updatedTeam
    }).then(result => {
        res.status(200).json({
            message: "Team Updated",
            team: {
                name: result.name,
                id: result._id
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

//DELETE Team by ID 
router.delete("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;
    
    Team.findByIdAndDelete(teamId)
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Team Successfully Deleted",
            Info:{
                result,
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





module.exports = router;
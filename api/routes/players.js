const express = require("express");
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
    res.json({
        message: "Players - GET by ID",
        id: playerId,
        method: req.method
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
    res.json({
        message: "Players - DELETE by ID",
        id: playerId,
        method: req.method
    })
});





module.exports = router;
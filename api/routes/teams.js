const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        message: "Teams - GET",
        method: req.method
    })
});

router.post("/", (req, res, next) => {
    res.json({
        message: "Teams - POST",
        method: req.method
    })
});

router.get("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;
    res.json({
        message: "Teams - GET by ID",
        id: teamId,
        method: req.method
    })
});

router.patch("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;
    res.json({
        message: "Teams - PATCH by ID",
        id: teamId,
        method: req.method
    })
});

router.delete("/:teamId", (req, res, next) => {
    const teamId = req.params.teamId;
    res.json({
        message: "Teams - DELETE by ID",
        id: teamId,
        method: req.method
    })
});





module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res, next) => {
  res.json("All good in here");
});

router.post("/:userId", (req, res, next) => {
    res.json("All posted")
});

module.exports = router;
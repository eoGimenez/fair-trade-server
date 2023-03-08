const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here1");
});

module.exports = router;

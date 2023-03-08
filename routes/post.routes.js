const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("todo ok get vieja");
});

router.post("/new", (req, res, next) => {
    res.json("post a post xD")
});

router.get("/:postId", (req, res, next) => {
    res.json("get a post ID")
});

router.put("/:postId/edit", (req, res, next) =>{
    res.json("post a edit ")
});


module.exports = router;
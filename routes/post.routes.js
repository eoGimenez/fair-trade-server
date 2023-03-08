const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")

router.get("/", (req, res, next) => {
  res.json("All good in here2");
});

router.post("/new", (req, res, next) => {
    res.json("post a post xD")
});

router.get("/:postId", (req, res, next) => {
    res.json("get a post ID")
});

router.put("/:postId/edit", (req, res, next) =>{
    const {contract, image, description, batch, price, category, available} = req.body;
    const{postId} = req.params;
    console.log("POST", req.body)
    Post.findByIdAndUpdate(postId, {contract, image, description, batch, price, category, available}, {new: true})
    .then(result => {
        console.log("RESULT", result)
        res.json("post a edit4 ")
    })
    .catch(err => console.log(err))
});
router.delete("/:postId/delete", (req, res, next) => {
    res.json("delete post ok ")
})


module.exports = router;
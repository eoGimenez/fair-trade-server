const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const fileUploader = require("../config/cloudinary.config");
//const {isAuthenticated} = require('../middleware/jwt.middleware')

////////////////////////////////////////////////////////////////
router.put("/:postId/edit",  (req, res, next) => {
    const {post} = req.query
    const {postId} = req.params
    console.log("Post", req.body.post)
    // Post.findOneAndUpdate({_id: postId}, {contract} , {image}, {description}, {batch}, {price}, {category},{available},   {new: true})
    // .then((updatedPost)=>{
    //     res.json(result);
    // })
    // .catch((err)=>console.log(err))
});
////////////////////////////////////////////////////////////////

router.get("/", (req, res, next) => {
  res.json("All good in here2");
});

router.post("/new", (req, res, next) => {
    res.json("post a post xD")
});

// router.get("/:postId", (req, res, next) => {
//     res.json("get a post ID")
// });

// router.put("/:postId/edit", (req, res, next) =>{
//     res.json("post a edit ")
// });
router.delete("/:postId/delete", (req, res, next) => {
    res.json("delete post ok ")
})


module.exports = router;
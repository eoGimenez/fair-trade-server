const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")

router.get("/", (req, res, next) => {
    Post.find()
    .then(results => {
        res.json(results);
    })
    .catch(err => crossOriginIsolated.log(err))
  })





  router.post("/new", (req, res, next) => {
    const { title, contract, image, description, batch, price, category, available } =
      req.body;
    Post.create({
      title,
      contract,
      image,
      description,
      batch,
      price,
      category,
      available,
    })
      .then((result) => {
        console.log("RESULT", result);
        res.json(result);
      })
      .catch((err) => next(err));
  });
router.get("/:postId", (req, res, next) => {
    //const {contract, image, description, batch, price, category, available} = req.body;
    const {postId} = req.params;
    console.log({postId});
    Post.findById(postId)
    .then((result)=>{
        console.log("RESULT", result)
    res.json("get a post Id");
    })
    .catch(err => console.log(err))
    });

router.put("/:postId/edit", (req, res, next) =>{
    const {title, contract, image, description, batch, price, category, available} = req.body;
    const{postId} = req.params;
    console.log("POST", req.body)
    Post.findByIdAndUpdate(postId, {title, contract, image, description, batch, price, category, available}, {new: true})
    .then(result => {
        console.log("RESULT", result)
        res.json(result)
    })
    .catch(err => console.log(err))
});


    router.delete("/:postId/delete", (req, res, next) => {
    const {postId} = req.params;
    Post.findByIdAndDelete(postId)
    .then(result => {
        res.json("deleted")
    })
    .catch(err => console.log(err))
})


module.exports = router;
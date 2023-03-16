const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  Post.find()
    .populate("author")
    .then((result) => {
      /*  console.log("RESULT POPULADO", result); */
      res.json(result);
    })
    .catch((err) => next(err));
});

router.post("/new", (req, res, next) => {
  const { title, contract, image, description, batch, price, category, available, author } = req.body;
  /* console.log("AUTHOR DEL BACK",author) */
  Post.create({
    title,
    contract,
    image,
    description,
    batch,
    price,
    category,
    available,
    author
  })
    .then((result) => {
      return User.findByIdAndUpdate(author, {
        $push: { posts: result._id }
      });
    })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

router.get("/:postId", (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .populate("author")
    .then((result) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

router.put("/:postId/edit", (req, res, next) => {
  const { title, contract, image, description, batch, price, category, available } = req.body;
  const { postId } = req.params;
  console.log("REQ.BODY-POST", req.body)
  Post.findByIdAndUpdate(postId, { title, contract, image, description, batch, price, category, available }, { new: true })
    .then(result => {
      console.log("RESULT", result)
      res.json(result)
    })
    .catch((err) => next(err));
});

router.delete("/:postId/delete", (req, res, next) => {
  const { postId } = req.params;
  console.log("IDPOST: ", postId)
  Post.findById(postId)
    .then(response => {
      return User.findById(response.author._id)
    })
    .then(response => {
      response.posts = response.posts.filter(every => every != postId)
      console.log("RESULTADO DEL SPLICE:", response)
      return response.save()
    })
  Post.findByIdAndDelete(postId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

module.exports = router;

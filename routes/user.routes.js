const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require('../middleware/jwt.middleware')

router.get("/:userId",/* isAuthenticated, */ (req, res, next) => {
  const {userId} = req.params;
  User.findById(userId)
  /*  .populate("posts")  */
   .then(result=>{
    res.json(result);
   })
  .catch(err=>next(err))
});

router.put("/:userId/edit", isAuthenticated, (req, res, next) => {
  const { userId } = req.params
  const { email, password ,name ,surname ,commercename ,role ,cif ,avatar ,aboutme ,location } = req.body

  User.findByIdAndUpdate( userId, {email, password,name,surname,commercename,role,cif,avatar,aboutme,location} , {new:true})
  .then(result => {
    res.json(result);
})
.catch(err => next(err))

});
router.delete("/:userId/delete", (req, res, next) => {
  res.json( "delete user ok " )
})

//CLOUDINARY!!!!!!!!!!!!!
// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("avatar"), (req, res, next) => {
  // console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});


module.exports = router;
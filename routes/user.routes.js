const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require('../middleware/jwt.middleware')

<<<<<<< HEAD

router.get("/all", /* isAuthenticated, */ (req, res, next) => {
  User.find()
  .then(response => {
      res.json(response);
      console.log("RESPONSE-BACK:",response)
  })
  .catch(err=>next(err))
})

router.get("/:userId",/* isAuthenticated */ (req, res, next) => {
=======
router.get("/:userId",/* isAuthenticated, */ (req, res, next) => {
>>>>>>> 94559c4c28dafbefbf7b809d0c4693344c2999aa
  const {userId} = req.params;

  console.log("PARAMS-BACK", req.params)
  
  User.findById(userId)
  /*  .populate("posts")  */
   .then(result=>{
    console.log('GET-userId-RESPONSE')
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
<<<<<<< HEAD

router.delete("/:id/delete", (req, res, next) => {
  const { userId } = req.params
  User.findByIdAndDelete(userId)
  .then((response)=> {
    res.json({resultado: "ok"})
  })
    
.catch((err) => next(err))
})
=======
router.delete("/:id/delete", (req, res, next) => {
  const { userId } = req.params
  User.findByIdAndDelete(userId)
  .then((response)=> {
    res.json({resultado: "ok"})
  })
.catch((err) => next(err))
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


>>>>>>> 94559c4c28dafbefbf7b809d0c4693344c2999aa
module.exports = router;
const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require('../middleware/jwt.middleware')
const bcrypt = require ("bcrypt")
const saltRounds = 10;
let hashedPassword;


router.get("/all", /* isAuthenticated, */ (req, res, next) => {
  User.find()
  .then(response => {
      res.json(response);
      console.log("RESPONSE-BACK:",response)
  })
  .catch(err=>next(err))
})

router.get("/:userId",/* isAuthenticated */ (req, res, next) => {
  const {userId} = req.params;

  console.log("PARAMS-BACK", req.params)
  
  User.findById(id)
    .populate("posts") 
   .then(result=>{
    console.log("result FINDBYID", result)
    res.json(result);
   })
  .catch(err=>next(err))
});

router.put("/:id/edit", /* isAuthenticated,  */(req, res, next) => {
  const { id } = req.params
  const { email, password , passwordRe, name ,surname  ,cif ,avatar, } = req.body
  console.log("REQ>BODY.PUT", req.body)

  if (email === "" || password === ""  || passwordRe === "" || name === "" || surname === ""   || cif === "") {
    res.status(400).json({ message: "Please, compleate the mandaroty field" });
    return;
  }
  console.log("comprobacion1")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  console.log("comprobacion2")

  if (password !== undefined ) {const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
       hashedPassword = bcrypt.hashSync(password, salt);
}
  console.log("comprobacion3")


  User.findByIdAndUpdate( id, {email, password: hashedPassword ,name,surname,cif,avatar} , {new:true})
  .then(result => {
    console.log("RTA BASE DE DATO", result)
  res.json(result);
})
.catch(err => next(err))

});

router.put("/:id/edit/commerce", /* isAuthenticated,  */(req, res, next) => {
  const { id } = req.params
  const { commercename, location , aboutme} = req.body
  console.log("REQ>BODY.PUT", req.body)

  if (commercename === "" || location === ""  || aboutme === "" ) {
    res.status(400).json({ message: "Please, compleate the mandaroty field" });
    return;
  }
  User.findByIdAndUpdate( id, {commercename, location , aboutme} , {new:true})
  .then(result => {
    console.log("RTA BASE DE DATO", result)
  res.json(result);
})
.catch(err => next(err))

})

router.delete("/:id/", (req, res, next) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
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


module.exports = router;
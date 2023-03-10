const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require('../middleware/jwt.middleware')


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

router.delete("/:id/delete", (req, res, next) => {
  const { userId } = req.params
  User.findByIdAndDelete(userId)
  .then((response)=> {
    res.json({resultado: "ok"})
  })
    
.catch((err) => next(err))
})
module.exports = router;
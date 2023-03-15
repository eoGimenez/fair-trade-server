const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");



const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { name, surname, commercename, email, password, passwordRe,  role, cif } = req.body;

  if (email === "" || password === "" || name === "" || passwordRe === "" || surname === "" || commercename === "" || role === "" || cif === "") {
    console.log("400 campos completos")
    res.status(400).json({ message: "Please, compleate the mandaroty field" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    console.log("400 email correcto")
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  } 

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    console.log("400 error en la password")
    res.status(400).json({
      message:
        "Check for Password requirement",
    });
    return;
  }

  User.findOne({ email })
    .then((result) => {
      if (result) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name, surname, commercename, role, cif });
    })
    .then((response) => {
      const { email, name, _id, surname,  commercename, role, cif } = response;
      const user = { email, name, surname,  commercename, role, cif, _id };
      console.log("USER:", user)
      res.status(201).json({ user: user });

    })
    .catch((err) => next(err));
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Please, provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((result) => {
      if (!result) {
        res.status(401).json({ message: "Wrong credentials, please, check them." });
        return;
      }
      if (!bcrypt.compareSync(password, result.password)) {
        res.status(401).json({ message: "Wrong credentials, please, check them." });
        return;
      }

      const { _id, email, commercename, role, name, surname, cif, avatar, aboutme, location, chatsId } = result;
      const payload = { _id, email, commercename, role, name, surname, cif, avatar, aboutme, location, chatsId };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken: authToken });
    })
   // .catch((err) => next(err));
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  //console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;

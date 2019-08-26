const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//Load User Model
const User = require("../../models/User");
const keys = require("../../config/keys");
//Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
/*
 * @route Get api/users/test
 * @desc Test Users route
 * @access  Public
 */

router.get("/test", (req, res) =>
  res.json({
    msg: "user works ,this is the route"
  })
);

/*
 * @route Get api/users/register
 * @desc register Users
 * @access  Public
 */

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let findUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // If email exist ,return status 400 ,else create new User
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;

          // Save in db
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  };
  findUser(req, res);
});

/*
 * @route Get api/users/login
 * @desc Login Users / returning JWT Token
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched ,  Generate a token
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            //send the token as a response ,with the user info in it
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "PassWord incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});
/*
 * @route Get api/users/current user
 * @desc Return c Users user
 * @access  Privat
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(res);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;

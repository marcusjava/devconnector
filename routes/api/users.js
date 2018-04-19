const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secret;
const passport = require("passport");

// Load User Model
const User = require("../../models/User");

// Load input validation
const validateRegisterInput = require("../../validation/register");
// Login validation
const validateLoginInput = require("../../validation/login");

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // chack errors
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user and returning token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      // check user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      if (!isValid) {
        return res.status(400).json(errors);
      }

      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          // token
          jwt.sign(
            payload,
            secret,
            {
              expiresIn: 3600
            },
            (error, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          errors.password = "Password does not match";
          return res.status(400).json(errors);
        }
      });
    })
    .catch();
});

// @route GET api/users/current
// @desc return current user
// @access protected
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.json({
      msg: "Success you logged",
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    })
);

module.exports = router;

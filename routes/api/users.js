const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const available_classes = [
  { subject: "Physics", time: "1PM" },
  { subject: "Maths", time: "2PM" },
  { subject: "Chemistry", time: "3PM" },
];

// Load User model
const User = require("../../models/Users");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        available_classes: available_classes,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              classes_taken: user.taken_classes,
              available_classes: user.available_classes,
              requested_classes: user.requested_classes,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Request a Class by student, returns 200 when acceptedby DB
// @access Student
router.post("/requestClass", (req, res) => {
  console.log(req.body);
  const request_class = { subject: req.body.subject, time: req.body.time };
  // Find the student by id and update the class
  User.findByIdAndUpdate(req.body.id, {
    //   Remove the class from available classes
    $pull: { available_classes: { subject: req.body.subject } },
    //   Add the class to Request
    $addToSet: { requested_classes: request_class },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json({ error: "DB Error" }));
});

// Accept class of a student, returns 200 when accepted by DB
// @access admin
router.post("/acceptClass", (req, res) => {
  const request_class = { subject: req.body.subject, time: req.body.time };
  // Find the student by id and update the class
  User.findByIdAndUpdate(req.body._id, {
    // Remove the class from request
    $pull: { requested_classes: { subject: req.body.subject } },
    // Add it to the Accept
    $addToSet: { taken_classes: request_class },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json({ error: "DB Error" }));
});

module.exports = router;

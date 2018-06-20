const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const errors = {};
// @route GET api/profile/test
// @desc test profile route
router.get("/test", (req, res) => {
  console.log(req);
  res.json({ msg: "Profile api working" });
});

// @route GET api/profile
// @desc current users profile route
// @acsess private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.user);
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found";
          return res.status(404).json(errors);
        }
        return res.status(200).json(profile);
      })
      .catch(error => res.status(404).json(errors));
  }
);

// @route POST api/profile
// @desc Create or Edit user profile
// @acsess private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get the fields
    const profileFields = {};
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      // Return any errors with 400 code
      return res.status(400).json(errors);
    }
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // find user profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        console.log(profileFields);
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(error =>
            res.status(400).json({ msg: "Ocorreu um erro ao salvar o profile" })
          );
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            res.status(400).json({ msg: "That handle already exists" });
          }
        });
        // Save
        new Profile(profileFields)
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(error =>
            res.status(400).json({ msg: "Ocorreu um erro ao salvar o Profile" })
          );
      }
    });
  }
);

// @route GET api/profile/handle/:handle
// @desc GET profile by handle
// @acsess public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        // erro 404 not found
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => res.status(404).json(error));
});

// @route GET api/profile/all
// @desc GET all profile
// @acsess public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "Profiles not found on the server";
        // erro 404 not found
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(error => res.status(404).json(error));
});

// @route POST api/profile/experience
// @desc POST Experience to profile
// @acsess private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofiles = "Profile not found on the server";
          // erro 404 not found
          return res.status(404).json(errors);
        }
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          current: req.body.current,
          to: req.body.to,
          description: req.body.description
        };
        // Add experience
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
      });
  }
);

// @route POST api/profile/education
// @desc POST Education to profile
// @acsess private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found on the server" });
      }
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/experience/:id
// @desc DELETE Experience to profile
// @acsess private
router.delete(
  "/experience/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Remove index indexOf or Map or forEach
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.id);
      // Splice
      profile.experience.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/education/:id
// @desc DELETE Education to profile
// @acsess private

router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Remove index indexOf or Map or forEach
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.id);
      // Splice
      profile.education.splice(removeIndex, 1);
      profile.save().authenticatethen(profile => res.json(profile));
    });
  }
);

// @route GET api/profile/user/:id
// @desc GET profile by id
// @acsess public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        // erro 404 not found
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error =>
      res
        .status(404)
        .json({ msg: "Ocorreu um erro ao carregar o perfil do usuario" })
    );
});

// @route DELETE api/profile
// @desc DELETE user and profile
// @acsess private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ msg: "User and profile deleted" });
      });
    });
  }
);
module.exports = router;

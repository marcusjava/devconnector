const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");

// validation
const validation = require("../../validation/posts");

// @route POST api/posts
// @desc POST posts route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { erros, isValid } = validation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Posts({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    // save post
    newPost.save().then(post => res.json(post));
  }
);

// @route GET api/posts
// @desc GET posts route
// @access Public
router.get("/", (req, res) => {
  Posts.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(error => res.status(404).json(error));
});

// @route GET api/posts/:id
// @desc GET post route
// @access Public
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => res.status(404).json(error));
});

// @route DELETE api/posts/:id
// @desc DELETE post route
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          if (post.user.toString() !== req.user.id) {
            // 401 Authorization
            return res.status(401).json({ access_denied: "Acesso negado" });
          }
          // Delete
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(error => res.status(404).json({ error }));
        });
      })
      .catch(error => res.status(404).json(error));
  }
);

// @route POST api/posts/likes/:id
// @desc POST likes route
// @access Private
router.post(
  "/likes/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(404).json({ alreadyliked: "alreadyliked" });
          }
          // Add user id to like
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        });
      })
      .catch(error => res.status(404).json(error));
  }
);

// @route POST api/posts/unlikes/:id
// @desc POST unlikes route
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(404).json({ notliked: "Not liked yet" });
          }
          // Add user id to like
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        });
      })
      .catch(error => res.status(404).json(error));
  }
);

// @route POST api/posts/comment/:id
// @desc POST comment route
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user.id,
          name: req.body.name,
          text: req.body.text,
          avatar: req.body.avatar
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(error => res.status(404).json({ error }));
  }
);

// @route DELETE api/posts/:post_id/comment/:comment_id
// @desc POST comment route
// @access Private
router.delete(
  "/:post_id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.post_id)
      .then(post => {
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        // remove from array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(error => res.status(404).json({ error }));
  }
);

module.exports = router;

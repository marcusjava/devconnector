const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc test posts route
router.get("/test", (req, res) => {
  console.log(req);
  res.json({ msg: "Posts api working" });
});

module.exports = router;

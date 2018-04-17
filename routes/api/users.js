const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc test users route
router.get("/test", (req, res) => {
  console.log(req);
  res.json({ msg: "Users api working" });
});

module.exports = router;

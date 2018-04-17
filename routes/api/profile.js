const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc test profile route
router.get("/test", (req, res) => {
  console.log(req);
  res.json({ msg: "Profile api working" });
});

module.exports = router;

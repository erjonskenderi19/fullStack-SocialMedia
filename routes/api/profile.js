const express = require("express");
const router = express.Router();

/*
 * @route Get api/profile/test
 * @desc Test Profile route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works"
  })
);

module.exports = router;

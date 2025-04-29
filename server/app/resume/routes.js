const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createResume } = require("./controllers");
const { isEmployee } = require("../auth/middlewares");
const { validateResume } = require("./middlewares");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  validateResume,
  createResume
);

module.exports = router;

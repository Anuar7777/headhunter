const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createResume,
  getAllMyResumes,
  getResumeById,
} = require("./controllers");
const { isEmployee } = require("../auth/middlewares");
const { validateResume } = require("./middlewares");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  validateResume,
  createResume
);

router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  getAllMyResumes
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getResumeById
);

module.exports = router;

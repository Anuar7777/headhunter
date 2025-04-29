const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createResume,
  getAllMyResumes,
  getResumeById,
  deleteResume,
  updateResume,
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

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateResume,
  updateResume
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

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteResume
);

module.exports = router;

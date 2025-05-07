const express = require("express");
const router = express.Router();
const {
  createApply,
  getEmployeeApplies,
  deleteApply,
} = require("./controllers");
const passport = require("passport");
const { isEmployee } = require("../auth/middlewares");
const { validateApply } = require("./middlewares");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  validateApply,
  createApply
);
router.get(
  "/employee",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  getEmployeeApplies
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isEmployee,
  deleteApply
);

module.exports = router;

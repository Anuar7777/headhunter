const express = require("express");
const router = express.Router();
const {
  createApply,
  getEmployeeApplies,
  deleteApply,
  confirmApply,
  rejectApply,
} = require("./controllers");
const passport = require("passport");
const { isEmployee, isManager } = require("../auth/middlewares");
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
router.put(
  "/:id/confirm",
  passport.authenticate("jwt", { session: false }),
  isManager,
  confirmApply
);
router.put(
  "/:id/reject",
  passport.authenticate("jwt", { session: false }),
  isManager,
  rejectApply
);

module.exports = router;

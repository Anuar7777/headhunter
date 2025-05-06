const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validateVacancy } = require("./middlewares");
const { isManager } = require("../auth/middlewares");
const {
  getAvailableExperience,
  createVacancy,
  getCompanyVacancies,
  getVacancyById,
  deleteVacancy,
  updateVacancy,
  searchVacancy,
} = require("./controllers");

router.get("/experience", getAvailableExperience);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isManager,
  validateVacancy,
  createVacancy
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  isManager,
  getCompanyVacancies
);
router.get("/search", searchVacancy);
router.get("/:id", getVacancyById);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isManager,
  deleteVacancy
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isManager,
  validateVacancy,
  updateVacancy
);

module.exports = router;

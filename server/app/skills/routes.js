const express = require("express");
const router = express.Router();
const { getAllSkills, getSkillsByKey } = require("./controllers");

router.get("/", getAllSkills);
router.get("/:key", getSkillsByKey);

module.exports = router;

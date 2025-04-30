const express = require("express");
const router = express.Router();
const { getAvailableExperience } = require("./controllers");

router.get("/experience", getAvailableExperience);

module.exports = router;

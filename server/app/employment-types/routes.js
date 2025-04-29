const express = require("express");
const router = express.Router();
const { getEmploymentTypes } = require("./controllers");

router.get("/", getEmploymentTypes);

module.exports = router;

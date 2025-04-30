const express = require("express");
const router = express.Router();
const { getSpecializations } = require("./controllers");

router.get("/", getSpecializations);

module.exports = router;

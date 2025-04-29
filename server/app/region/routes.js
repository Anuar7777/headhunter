const express = require("express");
const router = express.Router();
const { getAllCities, getAllCountries } = require("./controllers");

router.get("/countries", getAllCountries);
router.get("/cities", getAllCities);

module.exports = router;

const City = require("./City");
const Country = require("./Country");

const getAllCountries = async (req, res) => {
  const countries = await Country.findAll();

  res.status(200).send(countries);
};

const getAllCities = async (req, res) => {
  const cities = await City.findAll();

  res.status(200).send(cities);
};

module.exports = {
  getAllCities,
  getAllCountries,
};

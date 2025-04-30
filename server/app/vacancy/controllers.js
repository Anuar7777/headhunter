const Experience = require("./models/Experience");

const getAvailableExperience = async (req, res) => {
  const experience = await Experience.findAll();

  res.status(200).send({ experience });
};

module.exports = {
  getAvailableExperience,
};

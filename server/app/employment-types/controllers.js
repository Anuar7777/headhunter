const EmploymentType = require("./EmploymentType");

const getEmploymentTypes = async (req, res) => {
  const employment_types = await EmploymentType.findAll();

  res.status(200).send(employment_types);
};

module.exports = {
  getEmploymentTypes,
};

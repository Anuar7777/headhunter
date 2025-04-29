const Role = require("./Role");

const isEmployee = async (req, res, next) => {
  if (req.user) {
    const role = await Role.findByPk(req.user.role_id);
    if (role.name !== "employee") {
      res.status(403).send({ message: "Forbidden" });
    } else next();
  } else res.status(401).send({ message: "Unauthorized" });
};

const isManager = async (req, res, next) => {
  if (req.user) {
    const role = await Role.findByPk(req.user.role_id);

    if (role.name !== "manager") {
      res.status(403).send({ message: "Forbidden" });
    } else next();
  } else res.status(401).send({ message: "Unauthorized" });
};

module.exports = {
  isEmployee,
  isManager,
};

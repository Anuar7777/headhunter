const Role = require("./Role");
const User = require("./User");

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

const validateSignUp = async (req, res, next) => {
  const errors = {};

  const { email, full_name, company_name, password, password2 } =
    req.body || {};

  if (!email || email.trim().length === 0) {
    errors.email = "Поле Email обязательно";
  }

  if (!full_name || full_name.trim().length === 0) {
    errors.full_name = "Поле ФИО обязательно";
  }

  if (!company_name || company_name.trim().length === 0) {
    errors.company_name = "Поле Имя компании обязательно";
  }

  if (!password || password.trim().length === 0) {
    errors.password = "Поле Пароль обязательно";
  }

  if (!password2 || password2.trim().length === 0) {
    errors.password2 = "Поле Подтвердить пароль обязательно";
  }

  if (password !== password2) {
    errors.password2 = "Пароли не совпадают";
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    errors.email = "Пользователь с таким email уже существует";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateSignIn = (req, res, next) => {
  const errors = {};

  const { email, password } = req.body || {};

  if (!email || email.trim().length === 0) {
    errors.email = "Заполните Email";
  }

  if (!password || password.trim().length === 0) {
    errors.password = "Заполните пароль";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  isEmployee,
  isManager,
  validateSignUp,
  validateSignIn,
};

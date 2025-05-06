const sendMail = require("../utils/sendMail");
const AuthCode = require("./AuthCode");
const User = require("./User");
const Role = require("./Role");
const Company = require("./Company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sendVerificationEmail = async (req, res) => {
  try {
    const candidate = req.body.email;
    const code = "HH" + Date.now();

    await AuthCode.create({
      email: candidate,
      code,
      valid_till: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    await sendMail(candidate, "Authorization code from headhunter.kz", code);

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error while sending the verification code" });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const authCode = await AuthCode.findOne({ where: { email, code } });

    if (!authCode) {
      return res.status(401).send({ error: "Invalid code" });
    }

    if (authCode.valid_till < new Date()) {
      return res.status(401).send({ error: "Code has expired" });
    }

    let user = await User.findOne({ where: { email } });
    const role = await Role.findOne({ where: { name: "employee" } });

    if (!user) {
      user = await User.create({
        email,
        role_id: role.id,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: {
          id: role.id,
          name: role.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 24 * 60 * 60 }
    );

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Внутренняя ошибка сервера" });
  }
};

const signUp = async (req, res) => {
  try {
    const {
      email,
      full_name,
      password,
      company_name,
      company_description,
      company_address,
      company_logo,
    } = req.body;

    const role = await Role.findOne({ where: { name: "manager" } });

    const company = await Company.create({
      name: company_name,
      description: company_description,
      address: company_address,
      logo: "/company/" + req.file.filename,
    });

    const password_hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      full_name,
      password: password_hash,
      company_id: company.id,
      role_id: role.id,
    });

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Внутренняя ошибка сервера" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res
        .status(400)
        .send({ message: "Пользователя с таким email не существует" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ message: "Неправильный email или пароль" });
    }

    const role = await Role.findByPk(user.role_id);
    const company = await Company.findByPk(user.company_id);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: {
          id: role.id,
          name: role.name,
        },
        company_id: company.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 24 * 60 * 60 }
    );

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Внутренняя ошибка сервера" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyCode,
  signUp,
  signIn,
};

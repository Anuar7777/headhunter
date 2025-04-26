const sendMail = require("../utils/sendMail");
const AuthCode = require("./AuthCode");
const User = require("./User");
const Role = require("./Role");
const jwt = require("jsonwebtoken");

const sendVerificationEmail = async (req, res) => {
  try {
    const candidate = req.body.email;
    const code = "HH" + Date.now();

    await AuthCode.create({
      email: candidate,
      code,
      valid_till: new Date(Date.now() + 900000),
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
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyCode,
};

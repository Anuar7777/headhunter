const express = require("express");
const router = express.Router();
const { sendVerificationEmail, verifyCode } = require("./controllers");

router.post("/sendmail", sendVerificationEmail);
router.post("/verifycode", verifyCode);

module.exports = router;

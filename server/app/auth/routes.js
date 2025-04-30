const express = require("express");
const router = express.Router();
const {
  sendVerificationEmail,
  verifyCode,
  signUp,
  signIn,
} = require("./controllers");
const { validateSignUp, validateSignIn } = require("./middlewares");
const { upload } = require("./utils");

router.post("/sendmail", sendVerificationEmail);
router.post("/verifycode", verifyCode);
router.post("/signup", upload.single("company_logo"), validateSignUp, signUp);
router.post("/signin", validateSignIn, signIn);

module.exports = router;

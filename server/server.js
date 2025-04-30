const express = require("express");
const logger = require("morgan");
const passport = require("passport");

const app = express();

require("dotenv").config();
app.use(logger("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(__dirname + "/public"));

require("./app/auth/passport");

app.use("/api/auth", require("./app/auth/routes"));
app.use("/api/region", require("./app/region/routes"));
app.use("/api/skills", require("./app/skills/routes"));
app.use("/api/employment-types", require("./app/employment-types/routes"));
app.use("/api/languages", require("./app/languages/routes"));
app.use("/api/resumes", require("./app/resume/routes"));
app.use("/api/specializations", require("./app/specializations/routes"));
app.use("/api/vacancy", require("./app/vacancy/routes"));

app.get("/api", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

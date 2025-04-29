const Resume = require("./models/Resume");
const WorkingHistory = require("./models/WorkingHistory");
const Education = require("./models/Education");
const ForeignLanguage = require("./models/ForeignLanguage");
const ResumeEmploymentType = require("./models/ResumeEmploymentTypes");

const createResume = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      about,
      position,
      salary,
      salary_type,
      main_language,
      skills,
      citizenship,
      city_id,
    } = req.body;

    const resume = await Resume.create({
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      about,
      position,
      salary,
      salary_type,
      main_language,
      skills,
      user_id: req.user.id,
      citizenship,
      city_id,
    });

    if (req.body.working_histories && req.body.working_histories.length > 0) {
      req.body.working_histories.forEach(async (history) => {
        await WorkingHistory.create({
          resume_id: resume.id,
          ...history,
        });
      });
    }

    if (req.body.education && req.body.education.length > 0) {
      req.body.education.forEach(async (education) => {
        await Education.create({
          resume_id: resume.id,
          ...education,
        });
      });
    }

    if (req.body.foreign_languages && req.body.foreign_languages.length > 0) {
      req.body.foreign_languages.forEach(async (language) => {
        await ForeignLanguage.create({
          resume_id: resume.id,
          ...language,
        });
      });
    }

    if (req.body.employment_types && req.body.employment_types.length > 0) {
      req.body.employment_types.forEach(async (employment_type_id) => {
        await ResumeEmploymentType.create({
          resume_id: resume.id,
          employment_type_id,
        });
      });
    }

    return res.status(201).json(resume);
  } catch (error) {
    console.error("Ошибка при создании резюме:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  createResume,
};

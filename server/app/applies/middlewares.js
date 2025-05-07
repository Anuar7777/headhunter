const Resume = require("../resume/models/Resume");
const Vacancy = require("../vacancy/models/Vacancy");

const validateApply = async (req, res, next) => {
  const errors = {};

  let { resume_id, vacancy_id } = req.body || {};

  resume_id = Number(resume_id);
  vacancy_id = Number(vacancy_id);

  if (!resume_id || isNaN(resume_id)) {
    errors.resume_id = "Поле Резюме обязательно";
  }

  if (!vacancy_id || isNaN(vacancy_id)) {
    errors.vacancy_id = "Поле Вакансия обязательно";
  }

  try {
    if (!errors.vacancy_id) {
      const vacancy = await Vacancy.findByPk(vacancy_id);
      if (!vacancy) {
        errors.vacancy = "Такой вакансии не существует";
      }
    }

    if (!errors.resume_id) {
      const resume = await Resume.findByPk(resume_id);
      if (!resume) {
        errors.resume = "Такое резюме не существует";
      }
    }
  } catch (error) {
    console.error("Ошибка при проверке резюме/вакансии:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateApply,
};

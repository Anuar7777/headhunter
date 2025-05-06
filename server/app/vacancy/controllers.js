const Experience = require("./models/Experience");
const Vacancy = require("./models/Vacancy");

const getAvailableExperience = async (req, res) => {
  const experience = await Experience.findAll();

  res.status(200).send({ experience });
};

const createVacancy = async (req, res) => {
  try {
    const {
      name,
      salary_from,
      salary_to,
      salary_type,
      address,
      description,
      skills,
      about_company,
      main_language,
      specialization_id,
      city_id,
      employment_type_id,
      experience_id,
    } = req.body;

    const vacancy = await Vacancy.create({
      name,
      salary_from,
      salary_to,
      salary_type,
      address,
      description,
      skills,
      about_company,
      main_language,
      specialization_id,
      city_id,
      employment_type_id,
      experience_id,
      user_id: req.user.id,
      company_id: req.user.company_id,
    });

    res.status(201).send({ vacancy });
  } catch (error) {
    console.error("Ошибка при создании вакансии:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getAvailableExperience,
  createVacancy,
};

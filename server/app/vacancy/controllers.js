const Company = require("../auth/Company");
const EmploymentType = require("../employment-types/EmploymentType");
const City = require("../region/City");
const Specialization = require("../specializations/models/Specialization");
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

const getCompanyVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll({
      where: { company_id: req.user.company_id },
    });

    return res.status(200).send({ vacancies });
  } catch (error) {
    console.error("Ошибка при получении вакансий со стороны менеджера:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id, {
      include: [
        { model: City, as: "city" },
        { model: Company, as: "company" },
        { model: Experience, as: "experience" },
        { model: Specialization, as: "specialization" },
        { model: EmploymentType, as: "employment_type" },
      ],
    });

    if (!vacancy) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res.status(200).send({ vacancy });
  } catch (error) {
    console.error("Ошибка при получении вакансии по ID:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getAvailableExperience,
  createVacancy,
  getCompanyVacancies,
  getVacancyById,
};

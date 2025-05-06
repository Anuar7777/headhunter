const { Op } = require("sequelize");
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

const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (vacancy.company_id !== req.user.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await vacancy.destroy();

    res.status(200).end();
  } catch (error) {
    console.error("Ошибка при удалении вакансии:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (vacancy.company_id !== req.user.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

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

    await vacancy.update({
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
    });

    res.status(200).send({ vacancy });
  } catch (error) {
    console.error("Ошибка при редактировании вакансии:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const searchVacancy = async (req, res) => {
  try {
    const {
      q,
      salary,
      salary_type,
      city_id,
      employment_type_id,
      experience_id,
      specialization_id,
    } = req.query;

    const options = {};

    if (q) {
      options[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { skills: { [Op.iLike]: `%${q}%` } },
        { about_company: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (salary) {
      options[Op.and] = [
        { salary_from: { [Op.lte]: Number(salary) } },
        { salary_to: { [Op.gte]: Number(salary) } },
      ];
    }

    if (salary_type) {
      options.salary_type = salary_type;
    }

    if (city_id) {
      options.city_id = Number(city_id);
    }

    if (specialization_id) {
      options.specialization_id = Number(specialization_id);
    }

    if (employment_type_id) {
      options.employment_type_id = Number(employment_type_id);
    }

    if (experience_id) {
      options.experience_id = Number(experience_id);
    }

    const vacancies = await Vacancy.findAll({ where: options });

    return res.status(200).send({ vacancies });
  } catch (error) {
    console.error("Ошибка при поиске вакансий:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getAvailableExperience,
  createVacancy,
  getCompanyVacancies,
  getVacancyById,
  deleteVacancy,
  updateVacancy,
  searchVacancy,
};

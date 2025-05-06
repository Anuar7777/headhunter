const Resume = require("./models/Resume");
const WorkingHistory = require("./models/WorkingHistory");
const Education = require("./models/Education");
const ForeignLanguage = require("./models/ForeignLanguage");
const ResumeEmploymentType = require("./models/ResumeEmploymentTypes");
const Role = require("../auth/Role");
const EmploymentType = require("../employment-types/EmploymentType");
const City = require("../region/City");
const Country = require("../region/Country");
const { Op } = require("sequelize");

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

const getAllMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({ where: { user_id: req.user.id } });

    return res.status(200).json(resumes);
  } catch (error) {
    console.error("Ошибка при получении всех резюме пользователя:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id, {
      include: [
        { model: WorkingHistory, as: "working_history" },
        { model: Education, as: "education" },
        { model: ForeignLanguage, as: "foreign_language" },
        { model: City, as: "city" },
        { model: Country, as: "country" },
        {
          model: EmploymentType,
          as: "employment_types",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!resume) {
      return res.status(404).json({ message: "Not Found" });
    }

    const role = await Role.findByPk(req.user.role_id);
    if (resume.user_id !== req.user.id && role.name !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    console.error("Ошибка при получении резюме по id:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (resume.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await resume.destroy();

    res.status(200).json({ message: "Резюме успешно удалено" });
  } catch (error) {
    console.error("Ошибка при удалении резюме:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (resume.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

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

    await resume.update({
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
    });

    await WorkingHistory.destroy({
      where: {
        resume_id: resume.id,
      },
    });

    await ForeignLanguage.destroy({
      where: {
        resume_id: resume.id,
      },
    });

    await Education.destroy({
      where: {
        resume_id: resume.id,
      },
    });

    await ResumeEmploymentType.destroy({
      where: {
        resume_id: resume.id,
      },
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

    return res.status(200).json(resume);
  } catch (error) {
    console.error("Ошибка при редактировании резюме:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const searchResume = async (req, res) => {
  try {
    const { q, salary_from, salary_to, salary_type, city_id, citizenship } =
      req.query;

    const options = {};

    if (q) {
      options[Op.or] = [
        { first_name: { [Op.iLike]: `%${q}%` } },
        { last_name: { [Op.iLike]: `%${q}%` } },
        { position: { [Op.iLike]: `%${q}%` } },
        { about: { [Op.iLike]: `%${q}%` } },
        { skills: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (salary_from && !salary_to) {
      options.salary = { [Op.gte]: Number(salary_from) };
    } else if (!salary_from && salary_to) {
      options.salary = { [Op.lte]: Number(salary_to) };
    } else if (salary_from && salary_to) {
      options.salary = {
        [Op.between]: [Number(salary_from), Number(salary_to)],
      };
    }

    if (salary_type) {
      options.salary_type = salary_type;
    }

    if (city_id) {
      options.city_id = Number(city_id);
    }

    if (citizenship) {
      options.citizenship = Number(citizenship);
    }

    const resumes = await Resume.findAll({ where: options });

    return res.status(200).send({ resumes });
  } catch (error) {
    console.error("Ошибка при поиске резюме:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  createResume,
  getAllMyResumes,
  getResumeById,
  deleteResume,
  updateResume,
  searchResume,
};

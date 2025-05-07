const Apply = require("./Apply");
const { NEW } = require("./utils");
const sendMail = require("../utils/sendMail");
const Resume = require("../resume/models/Resume");
const Vacancy = require("../vacancy/models/Vacancy");
const User = require("../auth/User");
const { Op } = require("sequelize");

const createApply = async (req, res) => {
  try {
    const { resume_id, vacancy_id } = req.body;

    const apply = await Apply.create({
      resume_id,
      vacancy_id,
      status: NEW,
    });

    const resume = await Resume.findByPk(resume_id);
    const vacancy = await Vacancy.findByPk(vacancy_id);
    const manager = await User.findByPk(vacancy.user_id);
    console.log("До email");
    await sendMail(
      manager.email,
      `Новый отклик на вакансию ${vacancy.name}`,
      `
        Имя соискателя: ${resume.first_name}
        Фамилия соискателя: ${resume.last_name}
        Номер соискателя: ${resume.phone}
        `
    );
    console.log("После email");
    return res.status(201).send({ apply });
  } catch (error) {
    console.error("Ошибка при создании заявки");
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getEmployeeApplies = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: { user_id: req.user.id },
    });

    const ids = resumes.map((item) => item.id);

    const applies = await Apply.findAll({
      where: { resume_id: { [Op.in]: ids } },
      include: { model: Vacancy, as: "vacancy" },
    });

    return res.status(200).send({ applies });
  } catch (error) {
    console.error("Ошибка при получении списка заявок для работника:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

const deleteApply = async (req, res) => {
  try {
    const apply = await Apply.findByPk(req.params.id);

    if (!apply) {
      return res.status(404).send({ message: "Not Found" });
    }

    const author_resume = await Resume.findByPk(apply.resume_id);

    console.log(author_resume);
    if (author_resume.user_id !== req.user.id) {
      return res.status(403).send({ message: "Forbidden" });
    }

    await apply.destroy();
    return res.status(200).end();
  } catch (error) {
    console.error("Ошибка при удалении заявки:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  createApply,
  getEmployeeApplies,
  deleteApply,
};

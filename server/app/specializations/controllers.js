const Specialization = require("./models/Specialization");
const SpecializationType = require("./models/SpecializationType");

const getSpecializations = async (req, res) => {
  try {
    const specialization_types = await SpecializationType.findAll({
      include: [{ model: Specialization, as: "specializations" }],
    });

    res.status(200).send({ specialization_types });
  } catch (error) {
    console.error("Ошибка при получении специализаций:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getSpecializations,
};

const validateVacancy = (req, res, next) => {
  const errors = {};

  const { name, specialization_id, city_id, description, employment_type_id } =
    req.body || {};

  if (!name || name.trim().length === 0) {
    errors.name = "Поле Название вакансии обязательно";
  }

  if (!specialization_id || typeof specialization_id !== "number") {
    errors.specialization_id = "Поле Специализация обязательно";
  }

  if (!city_id || typeof city_id !== "number") {
    errors.city_id = "Поле Где искать сотрудника обязательно";
  }

  if (!description || description.trim().length === 0) {
    errors.description = "Поле Расскажите про вакансию обязательно";
  }

  if (!employment_type_id || typeof employment_type_id !== "number") {
    errors.employment_type_id = "Поле Тип занятости обязательно";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateVacancy,
};

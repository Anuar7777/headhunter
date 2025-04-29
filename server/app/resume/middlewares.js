const validateResume = (req, res, next) => {
  const errors = {};

  const {
    first_name,
    last_name,
    phone,
    birthday,
    gender,
    about,
    working_histories,
    education,
    employment_types,
  } = req.body || {};

  if (!first_name || first_name.trim().length === 0) {
    errors.first_name = "Поле Имя обязательно";
  }

  if (!last_name || last_name.trim().length === 0) {
    errors.last_name = "Поле Фамилия обязательно";
  }

  if (!phone || phone.trim().length === 0) {
    errors.phone = "Поле Телефон обязательно";
  }

  if (!birthday) {
    errors.birthday = "Поле Дата рождения обязательно";
  }

  if (!gender || gender.trim().length === 0) {
    errors.gender = "Поле Пол обязательно";
  }

  if (!about || about.trim().length === 0) {
    errors.about = "Поле О себе обязательно";
  }

  if (
    (!working_histories || working_histories.length === 0) &&
    (!education || education.length === 0)
  ) {
    errors.experience_or_education =
      "Необходимо указать хотя бы одно место работы или учебное заведение";
  }

  if (!employment_types || employment_types.length === 0) {
    errors.employment_types = "Необходимо выбрать хотя бы один тип занятости";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateResume,
};

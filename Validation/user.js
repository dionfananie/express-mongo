const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schemaUser = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schemaUser.validate(data);
};

const loginValidation = (data) => {
  const schemaUser = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schemaUser.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

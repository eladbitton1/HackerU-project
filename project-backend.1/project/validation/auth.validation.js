const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().trim(),
  email: Joi.string().min(8).max(255).email().required().trim(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,60}$"
      )
    )
    .required(),
  favorites: Joi.array().items(Joi.string().allow("").trim()),
  avatar: Joi.string().trim(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(8).max(255).email().required().trim(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,60}$"
      )
    )
    .required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().min(8).max(255).email().required().trim(),
});
const passwordSchema = Joi.object({
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{8,60}$"
      )
    )
    .required(),
});
const validatePasswordSchema = (userInput) => {
  return validate(passwordSchema, userInput);
};
const validateRegisterSchema = (userInput) => {
  return validate(registerSchema, userInput);
};

const validateLoginSchema = (userInput) => {
  return validate(loginSchema, userInput);
};

const validateForgotPasswordSchema = (userInput) => {
  return validate(forgotPasswordSchema, userInput);
};

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
  validatePasswordSchema
};

import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .label("First Name")
    .regex(/^[a-zA-Z]+$/)
    .trim(),
  email: Joi.string().email().min(6).max(30).required().label("Email").trim(),
  password: Joi.string()
    .min(8)
    .max(21)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&*()_+])[a-zA-Z\d-!@#$%^&*()_+]{8,21}$/
    )
    .required()
    .label("Password")
    .trim(),
};

export default registerSchema;

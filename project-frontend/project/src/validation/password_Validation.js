import Joi from "joi-browser";

const passwordSchema = {
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

export default passwordSchema;

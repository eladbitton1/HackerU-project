import Joi from "joi-browser";

const emailSchema = {
  email: Joi.string().email().min(6).max(30).trim().required().label("Email"),
};

export default emailSchema;

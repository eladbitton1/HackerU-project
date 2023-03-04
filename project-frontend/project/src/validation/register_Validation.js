import Joi from "joi-browser";

const registerSchema = {
  name:Joi.string().min(2).max(30).required().label("First Name").regex(/^[a-zA-Z]+$/),
  email: Joi.string().email().min(6).max(30).required().label("Email"),
  password: Joi.string().min(6).max(21).required().label("Password"),
  avatar:Joi.string().allow("").label("Avatar")
};

export default registerSchema;

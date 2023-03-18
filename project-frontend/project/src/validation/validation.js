import Joi from "joi-browser";

const validate = (objToValidate, schema) => {
  return Joi.validate(objToValidate, schema, { abortEarly: false });
};

export default validate;

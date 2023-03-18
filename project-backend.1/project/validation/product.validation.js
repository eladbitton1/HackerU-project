const Joi = require("joi");
const validate = require("./validate");

const newProductSchema = Joi.object({
  productName: Joi.string().min(2).max(255).required().trim(),
  productDescription: Joi.string().allow("").min(2).trim(),
  productCategory: Joi.string().min(5).max(255).required().trim(),
  productPrice: Joi.number().greater(-1).integer(),
});
const updateProductSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
  productName: Joi.string().min(2).max(255).required().trim(),
  productDescription: Joi.string().allow("").min(2).trim(),
  productCategory: Joi.string().min(6).max(20).required().trim(),
  productPrice: Joi.number().greater(-1).integer(),
});
const deleteProductSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});
const findProductByIDSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const validateNewProductSchema = (userInput) => {
  return validate(newProductSchema, userInput);
};
const validateUpdateProductSchema = (userInput) => {
  return validate(updateProductSchema, userInput);
};
const validateDeleteProductSchema = (userInput) => {
  return validate(deleteProductSchema, userInput);
};
const validateFindProductByIDSchema = (userInput) => {
  return validate(findProductByIDSchema, userInput);
};

module.exports = {
  newProductSchema,
  validateNewProductSchema,
  validateUpdateProductSchema,
  validateDeleteProductSchema,
  validateFindProductByIDSchema,
};

const Joi = require("joi");
const validate = require("./validate");

const newReviewSchema = Joi.object({
  productName: Joi.string().min(2).max(255).required().trim(),
  reviewAuthor:Joi.string().min(2).max(255).required().trim(),
  reviewDescription: Joi.string().min(2).max(255).required().trim(),
});
const updateReviewSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
  productName: Joi.string().min(2).max(255).required().trim(),
  reviewAuthor:Joi.string().min(2).max(255).required().trim(),
  reviewDescription: Joi.string().min(2).max(255).required().trim(),
});
const deleteReviewSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});
const findReviewByIDSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const validateNewReviewSchema = (userInput) => {
  return validate(newReviewSchema, userInput);
};
const validateUpdateReviewSchema = (userInput) => {
  return validate(updateReviewSchema, userInput);
};
const validateDeleteReviewSchema = (userInput) => {
  return validate(deleteReviewSchema, userInput);
};
const validateFindReviewByIDSchema = (userInput) => {
  return validate(findReviewByIDSchema, userInput);
};

module.exports = {
  newReviewSchema,
  validateNewReviewSchema,
  validateUpdateReviewSchema,
  validateDeleteReviewSchema,
  validateFindReviewByIDSchema,
};

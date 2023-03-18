import Joi from "joi-browser";

const reviewSchema = {
  reviewDescription: Joi.string()
    .allow("")
    .min(2)
    .max(1000)
    .trim()
    .label("productDescription"),
};
export default reviewSchema;

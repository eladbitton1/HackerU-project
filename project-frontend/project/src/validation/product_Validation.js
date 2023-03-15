import Joi from "joi-browser";

const productSchema = {
  productName: Joi.string().min(2).max(255).required().trim().label("productName"),
  productDescription: Joi.string().allow("").min(2).trim().label("productDescription"),
  productCategory: Joi.string().min(5).max(255).required().trim().label("productCategory"),
  productPrice: Joi.number().greater(-1).integer().label("productPrice"),
};

export default productSchema;

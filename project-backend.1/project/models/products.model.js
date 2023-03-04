const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categoryEnum = require("../enums/categoryEnum");

const productsSchema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String },
  productCategory: {
    type: String,
    enum: [...categoryEnum],
    default: categoryEnum[0],
    required: true,
  },
  productImg: { type: String },
  productLikes:{ type: Number },
  ownerId: { type: Schema.Types.ObjectId, ref: "users", ref:"googleUsers"  },
});


const Products = mongoose.model("products", productsSchema);

const createNewProduct = (
  productName,
  productDescription,
  productCategory,
  productImg,
  productLikes,
  ownerId
) => {
  const product = new Products({
    productName,
    productDescription,
    productCategory,
    productImg,
    productLikes,
    ownerId,
  });
  return product.save();
};

const showAllProducts = () => {
  return Products.find({});
};
const showUserProducts = (id) => {
  return Products.find({ownerId:id});
};
const showProductByCatergory = (catergory) => {
  return Products.find({productCategory:catergory});
};

const showProductByID = (id) => {
  return Products.findById(id);
};

const updateProductByID = (
  id,
  productName,
  productDescription,
  productCategory,
  productImg,
  productLikes
) => {
  return Products.findByIdAndUpdate(id, {
    productName,
    productDescription,
    productCategory,
    productImg,
    productLikes
  });
};

const deleteProductByID = (id) => {
  return Products.findByIdAndDelete(id);
};

module.exports = {
  createNewProduct,
  showAllProducts,
  showProductByID,
  updateProductByID,
  deleteProductByID,
  showUserProducts,
  showProductByCatergory
};

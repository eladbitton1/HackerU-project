const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productImgsSchema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});

const ProductImgs = mongoose.model("productImgs", productImgsSchema);

const createNewProductImgs = (name, img, productId) => {
  const productImgs = new ProductImgs({
    name,
    img,
    productId,
  });
  return productImgs.save();
};

const showProductImgById = (id) => {
  return ProductImgs.findOne({ productId: id });
};
const showAllProductsImgs = () => {
  return ProductImgs.find({});
};

module.exports = {
  createNewProductImgs,
  showAllProductsImgs,
  showProductImgById,
};

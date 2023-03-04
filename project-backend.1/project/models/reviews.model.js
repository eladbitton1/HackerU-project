const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  productName: { type: String, required: true },
  reviewDescription: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

const createNewReview = (productName, reviewDescription, productId) => {
  const review = new Reviews({
    productName,
    reviewDescription,
    productId,
  });
  return review.save();
};

const showAllReviews = () => {
  return Reviews.find({});
};

const showProductReviewsWithProductId = (productId) => {
  return Reviews.find({productId:productId});
};

const updateReviewByID = (id, productName, reviewDescription, productId) => {
  return Reviews.findByIdAndUpdate(id, {
    productName,
    reviewDescription,
    productId,
  });
};

const deleteReviewByID = (id) => {
  return Products.findByIdAndDelete(id);
};

module.exports = {
  createNewReview,
  showAllReviews,
  showProductReviewsWithProductId,
  updateReviewByID,
  deleteReviewByID,
};

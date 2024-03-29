const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  productName: { type: String, required: true },
  reviewAuthor: { type: String, required: true },
  reviewDescription: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

const createNewReview = (
  productName,
  reviewAuthor,
  reviewDescription,
  productId
) => {
  const review = new Reviews({
    productName,
    reviewAuthor,
    reviewDescription,
    productId,
  });
  return review.save();
};

const showAllReviews = () => {
  return Reviews.find({});
};

const showProductReviewsWithProductId = (productId) => {
  return Reviews.find({ productId: productId });
};

module.exports = {
  createNewReview,
  showAllReviews,
  showProductReviewsWithProductId,
};

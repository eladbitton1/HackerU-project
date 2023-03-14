const express = require("express");
const router = express.Router();
let debug = require("debug")("project:Reviews")
const {
  validateNewReviewSchema,
  validateUpdateReviewSchema,
  validateDeleteReviewSchema,
  validateFindReviewByIDSchema,
} = require("../../validation/reviews.validation");
const {
  createNewReview,
  showAllReviews,
  showProductReviewsWithProductId,
  updateReviewByID,
  deleteReviewByID,
} = require("../../models/reviews.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");

router.get("/", async (req, res) => {
  try {
    const allReviews = await showAllReviews();
    res.json(allReviews);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const validatedValue = await validateFindReviewByIDSchema(req.params);
    const reviewData = await showProductReviewsWithProductId(validatedValue.id);
    res.json(reviewData);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/:id", authMiddleware, async (req, res) => {
  
  try {
    
    const validatedValue = await validateNewReviewSchema(req.body);
    const userData = await createNewReview(
      validatedValue.productName,
      validatedValue.reviewAuthor,
      validatedValue.reviewDescription,
      req.params.id
    );
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.patch("/", authMiddleware, allowAccessMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateUpdateReviewSchema(req.body);
    const reviewData = await showReviewByID(validatedValue.id);
    if (!reviewData) throw "review does not exists";
    if (reviewData.ownerId === req.userData.id || req.userData.allowAccess) {
      await updateReviewByID(
        validatedValue.id,
        validatedValue.productName,
        validatedValue.reviewAuthor,
        validatedValue.reviewDescription
      );
    } else {
      throw "unauthorized";
    }
    res.json({ msg: "review updated" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete(
  "/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const validatedValue = await validateDeleteReviewSchema(req.params);
      const reviewData = await showReviewByID(validatedValue.id);
      if (!reviewData) throw "reviw does not exist";
      if (reviewData.ownerId === req.userData.id || req.userData.allowAccess) {
        const reviewDataAfterDelete = await deleteReviewByID(
          validatedValue.id
        );
        res.json(reviewDataAfterDelete);
      } else {
        throw "unauthorized";
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);

module.exports = router;

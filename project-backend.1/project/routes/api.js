const express = require("express");
const router = express.Router();
const authRouter = require("./api/auth");
const productsRouter = require("./api/products")
const reviewsRouter = require("./api/reviews")
const rateLimit = require("express-rate-limit")
const imagesRouter = require("./api/images");


const limiter = rateLimit({
    windowsMs: 15*60*1000,
    // windowsMs: 100,
    max:100
  })
 
router.use("/auth", limiter,authRouter);
router.use("/products",limiter, productsRouter);
router.use("/reviews",limiter, reviewsRouter);
router.use("/images", limiter, imagesRouter);


module.exports = router;
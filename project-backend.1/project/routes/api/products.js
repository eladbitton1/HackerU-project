const express = require("express");
const router = express.Router();
let debug = require("debug")("project:products");
const {
  validateNewProductSchema,
  validateUpdateProductSchema,
  validateDeleteProductSchema,
  validateFindProductByIDSchema,
} = require("../../validation/product.validation");
const {
  createNewProduct,
  showAllProducts,
  showProductByID,
  updateProductByID,
  deleteProductByID,
  showUserProducts,
  showProductByCatergory,
} = require("../../models/products.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");

router.get("/", async (req, res) => {
  try {
    const allProducts = await showAllProducts();
    res.json(allProducts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get(
  "/my-products/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const showMyProducts = await showUserProducts(req.params.id);
      res.json(showMyProducts);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);
router.get("/catergories/:catergory", async (req, res) => {
  try {
    const showProductsByCatergory = await showProductByCatergory(
      req.params.catergory
    );
    res.json(showProductsByCatergory);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const validatedValue = await validateFindProductByIDSchema(req.params);
    const productData = await showProductByID(validatedValue.id);
    res.json(productData);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get(
  "/getfavproducts",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      if (!req.query.productCardsArray) {
        throw " error getting data";
      }
      let userRequest = [];
      for (let item of req.query.productCardsArray) {
        const showFavProductByID = await showProductByID(item);
        userRequest.push(showFavProductByID);
      }

      res.json(userRequest);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.post("/", authMiddleware, allowAccessMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateNewProductSchema(req.body);
    const userData = await createNewProduct(
      validatedValue.productName,
      validatedValue.productDescription,
      validatedValue.productCategory,
      validatedValue.productPrice,
      validatedValue.productImg,
      (validatedValue.productLikes = 0),
      req.userData.id
    );
    res.status(201).json(userData);
  
  } catch (err) {
    res.status(400).json({ error: err });
   
  }
});
router.put("/:id", authMiddleware, allowAccessMiddleware, async (req, res) => {
  try {
    let id = req.params.id;

    let productName = req.body.productInfo.productName;

    let productDescription = req.body.productInfo.productDescription;
    let productCategory = req.body.productInfo.productCategory;
    let productPrice = req.body.productInfo.productPrice;
    const validatedValue = await validateUpdateProductSchema({
      id,
      productName,
      productDescription,
      productCategory,
      productPrice,
    });

    const updateProductWithID = await updateProductByID(
      validatedValue.id,
      validatedValue.productName,
      validatedValue.productDescription,
      validatedValue.productCategory,
      validatedValue.productPrice
    );
    debug(updateProductWithID);

    res.json("Product updated");
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete(
  "/:id",
  authMiddleware,
  allowAccessMiddleware,
  // authMiddleware,
  // allowAccessMiddleware,
  async (req, res) => {
    try {
      const validatedValue = await validateDeleteProductSchema({
        id: req.params.id,
      });
    
      const deleteProductById = await deleteProductByID(validatedValue.id);

      res.json("deleted");
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);

module.exports = router;

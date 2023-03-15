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

router.get("/my-products/:id", async (req, res) => {
  try {
    const showMyProducts = await showUserProducts(req.params.id);
    debug(showMyProducts)
    res.json(showMyProducts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
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

//GET FAV PRODUCTS
router.get("/getfavproducts", async (req, res) => {
  // debug("req.query.productCards " + req.query.productCardsArray);
  try {
    if (!req.query.productCardsArray) {
      throw " error with DATA";
    }
    let userRequest = [];
    for (let item of req.query.productCardsArray) {
      const showFavProductByID = await showProductByID(item);
      userRequest.push(showFavProductByID);
    }

    //   const showFavProductByID  = await showProductByID(req.params.id)
    //  debug("res.body " + req.params.id)
    res.json(userRequest);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/", authMiddleware, async (req, res) => {
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
    debug("succes");
  } catch (err) {
    res.status(400).json({ error: err });
    debug(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
   
    // debug(req.body);
    let id = req.params.id;
    
    let productName = req.body.productInfo.productName;
    
    let productDescription = req.body.productInfo.productDescription;
    let productCategory = req.body.productInfo.productCategory;
    let productPrice = req.body.productInfo.productPrice
    // debug(id)
    
    const updateProductWithID = await updateProductByID(
      id,
      productName,
      productDescription,
      productCategory,
      productPrice
    );
    debug(updateProductWithID)
    // debug(updateProductWithID)
    // const validatedValue = await validateUpdateProductSchema(req.body);
    // const productData = await showProductByID(validatedValue.id);
    // if (!productData) throw "product does not exists";
    // if (productData.ownerId === req.userData.id || req.userData.allowAccess) {
    //   // await updateProductByID(
    //   validatedValue.id,
    //   validatedValue.productName,
    //   validatedValue.productDescription,
    //   validatedValue.productCategory,
    //   validatedValue.productImg,
    //   validatedValue.productLikes
    // );
    // } else {
    //   throw "unauthorized";
    // }
    res.json("Product updated");
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete(
  "/:id",
  // authMiddleware,
  // allowAccessMiddleware,
  async (req, res) => {
    try {
const deleteProductById  = await deleteProductByID(req.params.id)
      // const validatedValue = await validateDeleteProductSchema(req.params);
      // const productData = await showProductByID(validatedValue.id);
      // if (!productData) throw "product does not exist";
      // if (productData.ownerId === req.userData.id || req.userData.allowAccess) {
      //   const productDataAfterDelete = await deleteProductByID(
      //     validatedValue.id
      //   );
      //   res.json(productDataAfterDelete);
      // } else {
      //   throw "unauthorized";
      // }
      res.json("deleted")
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);

module.exports = router;

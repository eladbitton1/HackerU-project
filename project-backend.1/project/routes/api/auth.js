const express = require("express");
const router = express.Router();
let debug = require("debug")("project:auth");
const {
  validateRegisterSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
  validatePasswordSchema,
} = require("../../validation/auth.validation");
const {
  findUserByEmail,
  createNewUser,
  updatePasswordById,
  addProductToFav,
  findFavProduct,
  removeFavProductByID,
  findGoogleUserByEmail,
  findGoogleUserFavProduct,
  removeGoogleUserFavProductByID,
  createGoogleNewUser,
  addProductToGoogleUserFav,
  findUserById,
  findGoogleUserById,
  getAllUsers,
  getAllGoogleUsers,
} = require("../../models/users.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");
const jwtDecode = require("jwt-decode");

const { createHash, cmpHash } = require("../../config/bcrypt");
const { genToken, verifyToken } = require("../../config/jwt");
const { json } = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const multer = require("multer");
const { decode } = require("punycode");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "HackerU.project@outlook.com",
    pass: "eShop25506!Aa",
  },
});

router.post("/register", async (req, res) => {
  try {
    // debug( "THIS REQ.BODY " + req.body.name)
    const validatedValue = await validateRegisterSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (user) {
      throw "try different email";
    }
    const hashedPassword = await createHash(validatedValue.password);
    validatedValue.password = hashedPassword;
    let newUser = await createNewUser(validatedValue);
    // debug("newUser " +newUser)
    res.status(201).json(newUser);
  } catch (error) {
    global.logger.warn({
      method: req.method,
      error: error.message,
      url: req.originalUrl,
      body: req.body.email,
      ip: req.ip,
    });

    res.status(400).json({ error });
  }
});

//register google users
router.post("/register/google-account", async (req, res) => {
  try {
    // debug( "THIS REQ.BODY " + req.body.name)

    const user = await findGoogleUserByEmail(req.body.email);
    if (user) {
      const token = await genToken({
        name: user.name,
        email: user.email,
        id: user._id,
        isAdmin: user.isAdmin,
        isGoogleAccount: true,
      });
      res.json({ token });
    } else {
      let newUser = await createGoogleNewUser(req.body);
      const token = await genToken({
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        isAdmin: newUser.isAdmin,
        isGoogleAccount: true,
      });
      res.status(201).json({ token });
    }

    //  let newUser =  await createNewUser(validatedValue);
    // debug("newUser " +newUser)
    // res.status(201).json(newUser);
  } catch (error) {
    global.logger.warn({
      method: req.method,
      error: error.message,
      url: req.originalUrl,
      body: req.body.email,
      ip: req.ip,
    });

    res.status(400).json({ error });
  }
});
// ADD TO FAV
router.patch("/addtofav/:id", async (req, res) => {
  try {
    // debug(" req.body " + req.body.id)
    let isGoogleAccount = req.body.isGoogleAccount;
    // debug(isGoogleAccount)
    let userID = req.body.id;
    let productID = req.params.id;
    if (!isGoogleAccount) {
      const findUserQueryByEmail = await findUserByEmail(req.body.email);
      // debug(findUserQueryByEmail)
      for (item of findUserQueryByEmail.favProducts) {
        if (item === productID) {
          throw "This product is already on your favorite list ";
        }
      }
      const addProductToFavorites = await addProductToFav(userID, productID);
      // debug(userID ," ",productID)

      res.status(200).json(addProductToFavorites);
    } else {
      const findUserQueryByEmail = await findGoogleUserByEmail(req.body.email);
      for (item of findUserQueryByEmail.favProducts) {
        if (item === productID) {
          throw "This product is already on your favorite list ";
        }
      }
      const addProductToGoogleUserFavorrites = await addProductToGoogleUserFav(
        userID,
        productID
      );
      res.status(200).json(addProductToGoogleUserFavorrites);
    }

    // debug(userID , productID)
    // const addProductToFavorites = addProductToFav(userID,productID)
    // debug("addProductToFavorites "+ addProductToFavorites)
    // const userDetailsByMail = findUserById(req.body.id)
    // debug("userID " + userID)

    // debug("FAV " + userDetailsByMail , userID , productID)
    // const findFavoriteProduct = await findFavProduct(productID);
    // if (!findFavoriteProduct) {
    //   const addProductToFavorite = await addProductToFav(userID, productID);
    // } else {
    //   throw " you already added this product to your favorites";
    // }
  } catch (error) {
    // debug(error);
    res.status(400).json({ error });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const getAllGoogleUsersInDB = await getAllGoogleUsers();
    // debug(getAllGoogleUsersInDB)
    const getAllUsersinDB = await getAllUsers();
    // const getAllGoogleUsersinDB = getAllGoogleUsers();
    // debug(getAllGoogleUsersinDB);
    res.status(200).json([getAllGoogleUsersInDB, getAllUsersinDB]);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//GET FAV products
router.get("/getfavproductsarray/:id", async (req, res) => {
  try {
    const findUserQueryById = await findUserById(req.params.id);

    const findGoogleUserQueryById = await findGoogleUserById(req.params.id);

    //  debug(findUserQueryById.favProducts)
    if (findUserQueryById) {
      res.json(findUserQueryById.favProducts);
    }
    if (findGoogleUserQueryById) {
      res.json(findGoogleUserQueryById.favProducts);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//REMOVE PRODUCT FROM FAV
router.patch("/removefromfav/:id", async (req, res) => {
  try {
    let userID = await req.body._id;
    let productID = req.params.id;
    const removeProductFromFavorites = await removeFavProductByID(
      userID,
      productID
    );
    const removeGoogleUserProductFromFavorites =
      await removeGoogleUserFavProductByID(userID, productID);
    res.status(200).json("product removed");
  } catch (error) {
    debug(error);
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validatedValue = await validateLoginSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (!user) {
      throw "Could not find user in database , please make sure your input is valid.";
    }
    const isEqual = await cmpHash(validatedValue.password, user.password);
    if (!isEqual) {
      throw "invalid email/password";
    }
    const token = await genToken({
      name: user.name,
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
      isGoogleAccount: false,
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
});
//EMAIL SEND

router.post("/forgotpassword", async (req, res) => {
  try {
    const validatedValue = await validateForgotPasswordSchema(req.body);
    const userData = await findUserByEmail(validatedValue.email);
    if (!userData) throw "error";
    const jwt = await genToken({ email: userData.email }, "1h");
    debug(userData.email);
    //send email or sms
    let passwordResetLink = "http://localhost:3000/resetpassword/" + jwt;

    const options = {
      from: "HackerU.project@outlook.com",
      to: userData.email,
      subject: "Password Reset",
      text:
        "Click the following link to reset your password:  " +
        passwordResetLink,
    };
    transporter.sendMail(options, (err, info) => {
      if (err) {
        debug(err);
        return;
      }
      debug(info.response);
    });

    // debug("http://localhost:3000/resetpassword/" + jwt);
    res.json({ msg: "Check your email / spam email " });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    //add joy for password

    const validatedValue = await validatePasswordSchema(req.body.password);
    const payload = await verifyToken(req.params.token);
    const userData = await findUserByEmail(payload.email);
    debug(validatedValue);
    if (!userData) throw "something went wrong";

    const hashedPassword = await createHash(validatedValue.password);
    await updatePasswordById(userData._id, hashedPassword);
    res.json({ msg: "password updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});
router.get(
  "/userInfo",

  async (req, res) => {
    try {
      // debug("req.headers "+ req.headers)
      let dataFromToken = jwtDecode(req.headers["x-auth-token"]);
      // let dataFromGoogleToken = jwtDecode(req.headers["tokenFromGoogle"]);
      // debug("dataFromGoogleToken " + req.headers.data )

      res.json(dataFromToken);
    } catch (error) {
      res.status(400).json("no data available on user");
    }
  }
);

module.exports = router;

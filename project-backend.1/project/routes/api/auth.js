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
  removeFavProductByID,
  findGoogleUserByEmail,
  removeGoogleUserFavProductByID,
  createGoogleNewUser,
  addProductToGoogleUserFav,
  findUserById,
  findGoogleUserById,
  getAllUsers,
  getAllGoogleUsers,
  findUserAndAppointAdmin,
  findGoogleUserAndAppointAdmin,
  findUserAndDeleteUser,
  findGoogleUserAndDeleteUser,
} = require("../../models/users.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");
const jwtDecode = require("jwt-decode");

const { createHash, cmpHash } = require("../../config/bcrypt");
const { genToken, verifyToken } = require("../../config/jwt");

const nodemailer = require("nodemailer");

const multer = require("multer");

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
    const validatedValue = await validateRegisterSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (user) {
      throw "try different email";
    }
    const hashedPassword = await createHash(validatedValue.password);
    validatedValue.password = hashedPassword;
    let newUser = await createNewUser(validatedValue);

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

router.post("/register/google-account", async (req, res) => {
  try {
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

router.patch(
  "/appoint-admin/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const findUserAndAppointAsAdmin = await findUserAndAppointAdmin(
        req.params.id
      );
      const findGoogleUserAndAppointAsAdmin =
        await findGoogleUserAndAppointAdmin(req.params.id);
      if (findUserAndAppointAsAdmin) {
        res.status(200).json("user appointed as admin");
      }
      if (findGoogleUserAndAppointAsAdmin) {
        res.status(200).json("user appointed as admin");
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.patch(
  "/addtofav/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      let isGoogleAccount = req.body.isGoogleAccount;

      let userID = req.body.id;
      let productID = req.params.id;
      if (!isGoogleAccount) {
        const findUserQueryByEmail = await findUserByEmail(req.body.email);

        for (item of findUserQueryByEmail.favProducts) {
          if (item === productID) {
            throw "This product is already on your favorite list ";
          }
        }
        const addProductToFavorites = await addProductToFav(userID, productID);

        res.status(200).json(addProductToFavorites);
      } else {
        const findUserQueryByEmail = await findGoogleUserByEmail(
          req.body.email
        );
        for (item of findUserQueryByEmail.favProducts) {
          if (item === productID) {
            throw "This product is already on your favorite list ";
          }
        }
        const addProductToGoogleUserFavorrites =
          await addProductToGoogleUserFav(userID, productID);
        res.status(200).json(addProductToGoogleUserFavorrites);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.get(
  "/all-users",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const getAllGoogleUsersInDB = await getAllGoogleUsers();

      const getAllUsersinDB = await getAllUsers();

      let combinedUsersArray = [...getAllGoogleUsersInDB, ...getAllUsersinDB];
      res.status(200).json(combinedUsersArray);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.get(
  "/getfavproductsarray/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const findUserQueryById = await findUserById(req.params.id);

      const findGoogleUserQueryById = await findGoogleUserById(req.params.id);

      if (findUserQueryById) {
        res.json(findUserQueryById);
      }
      if (findGoogleUserQueryById) {
        res.json(findGoogleUserQueryById);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const findUserAndDeleteTheUser = await findUserAndDeleteUser(
        req.params.id
      );
      const findGoogleUserAndDeleteTheUser = await findGoogleUserAndDeleteUser(
        req.params.id
      );
      if (findUserAndDeleteTheUser) {
        res.json("user deleted");
      }
      if (findGoogleUserAndDeleteTheUser) {
        res.json("user deleted");
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.patch(
  "/removefromfav/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      let userID = req.body.id;
      let productID = req.params.id;
      const removeProductFromFavorites = await removeFavProductByID(
        userID,
        productID
      );

      const removeGoogleUserProductFromFavorites =
        await removeGoogleUserFavProductByID(userID, productID);
      res.status(200).json("product removed");
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

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

router.post("/forgotpassword", async (req, res) => {
  try {
    const validatedValue = await validateForgotPasswordSchema(req.body);
    const userData = await findUserByEmail(validatedValue.email);
    if (!userData) throw "error";
    const jwt = await genToken({ email: userData.email }, "1h");
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
        return;
      }
    });

    res.json({ msg: "Check your email / spam email " });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    const validatedValue = await validatePasswordSchema(req.body.password);
    const payload = await verifyToken(req.params.token);
    const userData = await findUserByEmail(payload.email);
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
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      let dataFromToken = jwtDecode(req.headers["x-auth-token"]);

      res.json(dataFromToken);
    } catch (error) {
      res.status(400).json("no data available on user");
    }
  }
);

module.exports = router;

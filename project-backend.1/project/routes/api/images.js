const express = require("express");
const router = express.Router();
let debug = require("debug")("project:images");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");
const {
  createNewAvatarImg,
  showAllAvatarImgs,
  showAvatarImgByID,
  deleteAvatarImgByID,
} = require("../../models/avatarImg.model");
const {
  createNewProductImgs,
  showAllProductsImgs,
  showProductImgById,
} = require("../../models/productsImgs.model");
const multer = require("multer");
const fs = require("fs");

const avatarImgstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/avatarImgs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadSingleAvatarImg = multer({ storage: avatarImgstorage });

const productImgsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/productsImgs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadMulitpleProductImgs = multer({ storage: productImgsStorage });

router.get("/", authMiddleware, allowAccessMiddleware, async (req, res) => {
  try {
    const allData = await showAllAvatarImgs();
    res.json(allData);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post(
  "/:id",
  authMiddleware,
  uploadSingleAvatarImg.single("avatarImg"),
  async (req, res) => {
    try {
      const imgData = await createNewAvatarImg(
        req.body.name,
        {
          data: fs.readFileSync("images/avatarImgs/" + req.file.filename),
          contentType: "image/png",
        },
        req.userData.id
      );
      res.status(201).json(imgData);
    } catch (error) {
      res.status(400).json({error });
    }
  }
);
router.delete("/deleteAvatarImg/:id", authMiddleware, async (req, res) => {
  try {
    const deleteOldAvatarPic = await deleteAvatarImgByID(req.params.id);
    res.json("old image deleted");
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post(
  "/productImgs/:id",
  authMiddleware,
  uploadMulitpleProductImgs.array("productImgs", 3),
  async (req, res) => {
    try {
      let imgData;
      for (const file of req.files) {
        imgData = await createNewProductImgs(
          req.body.name,
          {
            data: fs.readFileSync("images/productsImgs/" + file.filename),
            contentType: "image/png",
          },
          req.params.id
        );
      }

      res.status(201).json(imgData);
  
    } catch (error) {
      res.status(400).json({error});
    }
  }
);

router.get(
  "/allProductImgs",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const allData = await showAllProductsImgs();
      res.json(allData);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.get(
  "/avatarImg/:id",
  authMiddleware,
  allowAccessMiddleware,
  async (req, res) => {
    try {
      const avatarImgData = await showAvatarImgByID(req.params.id);

      res.json([avatarImgData]);
    } catch (error) {
      res.status(400).json({ error });
    
    }
  }
);
router.get("/productImg/:id", async (req, res) => {
  try {
    const productImgData = await showProductImgById(req.params.id);
    res.json([productImgData]);
  } catch (error) {
    res.status(400).json({ error });
   
  }
});

module.exports = router;

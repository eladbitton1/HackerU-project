const express = require("express");
const router = express.Router();
let debug = require("debug")("project:images");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModify.middleware");
const {
  createNewAvatarImg,
  showAllAvatarImgs,
  showAvatarImgByID,
  updateAvatarImgByID,
  deleteAvatarImgByID
} = require("../../models/avatarImg.model");
const {
  createNewProductImgs,
  showAllProductsImgs,
  showProductImgById
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

router.get("/", async (req, res) => {
  try {
    const allData = await showAllAvatarImgs();
    res.json(allData);
  } catch (error) {
    debug(error);
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
      debug("succes");
    } catch (error) {
      debug(error);
    }
  }
);
router.delete("/deleteAvatarImg/:id", async (req, res) => {
  try {
    const deleteOldAvatarPic = await deleteAvatarImgByID(req.params.id)
    res.json("old image deleted");
  } catch (error) {
    debug(error);
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
      debug("succes");
    } catch (error) {
      debug(error);
    }
  }
);

router.get("/allProductImgs", async (req, res) => {
  try {
    const allData = await showAllProductsImgs();
    res.json(allData);
  } catch (error) {
    debug(error);
  }
});

router.get("/avatarImg/:id", async (req, res) => {
  try {
    const avatarImgData = await showAvatarImgByID(req.params.id);

    res.json([avatarImgData]);
  } catch (error) {
    res.json(error);
    debug(error);
  }
});
router.get("/productImg/:id", async (req, res) => {
  try {
   
    // debug("HERE " + req.params.id)
    const productImgData = await showProductImgById(req.params.id);
    res.json([productImgData]);
    // res.json(req.params);
  } catch (error) {
    res.json(error);
    debug(error);
  }
});
// router.patch(
//   "/avatarImg/:id",
//   authMiddleware,
//   uploadSingleAvatarImg.single("avatarImg"),
//   async (req, res) => {
//     debug(req.body)
//     try {
      
//       const avatarImgData = await showAvatarImgByID(req.params.id);
//       const updateImg = await updateAvatarImgByID(avatarImgData._id, req.body);
     
//       res.json("profile pic updated");
//     } catch (error) {
//       res.json(error);
//       debug(error);
//     }
//   }
// );
module.exports = router;

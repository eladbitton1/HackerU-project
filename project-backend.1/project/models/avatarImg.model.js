const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let debug = require("debug")("project:AvatarModel")

const avatarImgSchema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  ownerId: { type: Schema.Types.ObjectId, ref: "users", ref:"googleUsers" },
});

const AvatarImgs = mongoose.model("avatarImgs", avatarImgSchema);

const createNewAvatarImg = (name, img, ownerId) => {
  const avatarImg = new AvatarImgs({
    name,
    img,
    ownerId,
  });
  return avatarImg.save();
};

const showAvatarImgByID = (id) => {
 
  return AvatarImgs.findOne({ownerId: id});
};
const showAllAvatarImgs = () => {
  return AvatarImgs.find({});
};

const updateAvatarImgByID = (id) => {
  return AvatarImgs.findByIdAndUpdate(id, {});
};

const deleteAvatarImgByID = (id) => {
  return AvatarImgs.findOneAndDelete({ownerId: id});
};

module.exports = {
  createNewAvatarImg,
  showAllAvatarImgs,
  showAvatarImgByID,
  updateAvatarImgByID,
  deleteAvatarImgByID
};

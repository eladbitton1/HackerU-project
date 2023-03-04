const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let debug = require("debug")("project:users.model");

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  favProducts: [String],
  isAdmin: { type: Boolean, default: false },
});
const googleUsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  favProducts: [String],
  isAdmin: { type: Boolean, default: false },
});

const Users = mongoose.model("users", usersSchema);
const GoogleUsers = mongoose.model("googleUsers", googleUsersSchema);

const findUserByEmail = (email) => Users.findOne({ email });
const findGoogleUserByEmail = (email) => GoogleUsers.findOne({ email });
const findFavProduct = (favProducts) => Users.findOne({ favProducts });
const findGoogleUserFavProduct = (favProducts) =>
  GoogleUsers.findOne({ favProducts });
const removeFavProductByID = (id, favProducts) => {
  return Users.findOneAndUpdate(id, { $pull: { favProducts } });
};
const removeGoogleUserFavProductByID = (id, favProducts) => {
  return GoogleUsers.findOneAndUpdate(id, { $pull: { favProducts } });
};

const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};
const createGoogleNewUser = (userData) => {
  const newUser = new GoogleUsers(userData);
  return newUser.save();
};

const updatePasswordById = (id, password) =>
  Users.findByIdAndUpdate(id, { password });

const addProductToFav = (id, productID) => {
  const query = { _id: id };

  return Users.findOneAndUpdate(
    query,
    { $push: { favProducts: { $each: [productID] } } },
    { new: true }
  );
};
const addProductToGoogleUserFav = (id, productID) => {
  const query = { _id: id };
  return GoogleUsers.findOneAndUpdate(
    query,
    { $push: { favProducts: { $each: [productID] } } },
    { new: true }
  );
};
// const addProductToGoogleUserFav = (id,favProducts) => GoogleUsers.findOneAndUpdate(id,{$push:{favProducts}})
const findUserById = (id) => Users.findOne({ _id:id });

const findGoogleUserById = (id) => GoogleUsers.findOne({ id });

module.exports = {
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
};

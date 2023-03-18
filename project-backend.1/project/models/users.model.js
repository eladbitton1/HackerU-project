const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let debug = require("debug")("project:users.model");

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favProducts: [String],
  isAdmin: { type: Boolean, default: false },
});
const googleUsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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
  const query = { _id: id };
  return Users.findOneAndUpdate(query, { $pull: { favProducts } });
};

const removeGoogleUserFavProductByID = (id, favProducts) => {
  const query = { _id: id };
  return GoogleUsers.findOneAndUpdate(query, { $pull: { favProducts } });
};

const getAllUsers = () => {
  return Users.find();
};
const getAllGoogleUsers = () => GoogleUsers.find();

const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};
const createGoogleNewUser = (userData) => {
  const newUser = new GoogleUsers(userData);
  return newUser.save();
};
const findUserAndAppointAdmin = (id) => {
  const query = { _id: id };
  return Users.findOneAndUpdate(query, { isAdmin: true });
};
const findGoogleUserAndAppointAdmin = (id) => {
  const query = { _id: id };
  return GoogleUsers.findOneAndUpdate(query, { isAdmin: true });
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

const findUserById = (id) => Users.findOne({ _id: id });

const findGoogleUserById = (id) => GoogleUsers.findOne({ _id: id });
const findUserAndDeleteUser = (id) => {
  return Users.findOneAndDelete({ _id: id });
};
const findGoogleUserAndDeleteUser = (id) => {
  return GoogleUsers.findOneAndDelete({ _id: id });
};
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
  getAllUsers,
  getAllGoogleUsers,
  findUserAndAppointAdmin,
  findGoogleUserAndAppointAdmin,
  findUserAndDeleteUser,
  findGoogleUserAndDeleteUser,
};

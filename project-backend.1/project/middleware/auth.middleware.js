const { verifyToken } = require("../config/jwt");
const auth = async (req, res, next) => {
  try {
    const payload = await verifyToken(req.headers["x-auth-token"]);
    //we may need to find user
    req.userData = payload;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
module.exports = auth;

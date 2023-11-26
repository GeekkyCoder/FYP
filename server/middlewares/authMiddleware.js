const jwt = require("jsonwebtoken")

const isTokenValid = async token => await jwt.verify(token, process.env.ACCESS_TOKEN);

const authMiddleware = async (req, res, next) => {
    // if there is no token, user is not authorized
    if (!req.signedCookies.token) {
      return res.status(400).json({ msg: "not authorized" });
    }

    const { token } = req.signedCookies;
  
    const decodedUser = await isTokenValid(token);
  
    if (decodedUser) {
      const { userId, userName, role } = decodedUser;
      req.user = { userId, userName, role };
      next();
    } else {
      return res.status(400).json({ msg: "not authorized" });
    }
  };
  
  module.exports = authMiddleware;
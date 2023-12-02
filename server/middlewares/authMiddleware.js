const jwt = require('jsonwebtoken');

const isTokenValid = async (token) => await jwt.verify(token, process.env.ACCESS_TOKEN);

const authMiddleware = async (req, res, next) => {
  // if there is no token, user is not authorized
  if (!req.signedCookies.token) {
    throw new Error('not authorized');
  }

  const { token } = req.signedCookies;

  const decodedUser = await isTokenValid(token);

  if (decodedUser) {
    const { userId, userName, role } = decodedUser;
    req.user = { userId, userName, role };
    next();
  } else {
    throw new Error('not authorized');
  }
};

module.exports = authMiddleware;

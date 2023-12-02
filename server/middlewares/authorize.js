const { StatusCodes } = require("http-status-codes");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'only admin can perform this action 😛' });
    }
    next();
  };
};

module.exports = authorize;

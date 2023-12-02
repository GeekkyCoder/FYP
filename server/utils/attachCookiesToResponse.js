const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = async (tokenUser) => {
  return await jwt.sign(tokenUser, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

const attachCookiesToResponse = async (res, tokenUser,user) => {
  const token = await createJWT(tokenUser);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_YEAR),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    // sameSite:"none"
  });
   
  res.status(200).json({user})
};

module.exports = attachCookiesToResponse;

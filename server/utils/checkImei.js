const Imei = require('node-imei');

const checkImei = (imei) => {
  const IMEI = new Imei();

  if (!IMEI.isValid(String(imei))) {
    return false;
  }

//   if(IMEI.device())

  return true;
};

module.exports = {
  checkImei,
};

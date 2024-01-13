const axios = require('axios');
require('dotenv').config();

const phoneInfo = async (imei) => {
  const options = {
    method: 'GET',
    url: 'https://kelpom-imei-checker1.p.rapidapi.com/api',
    params: {
      service: 'model',
      imei: `${imei}`,
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'kelpom-imei-checker1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data
    return {
        imeiCode:data.imei,
        deviceName:data.model.device,
        brandName:data.model.brand,
        modelName:data.model_nb
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  phoneInfo,
};

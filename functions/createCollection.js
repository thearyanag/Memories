const axios = require("axios")
require("dotenv").config();

let token = process.env.UNDERDOG_TOKEN

/**
  to create a collection from collection name / init media
*/
const createCollection = async (text, media) => {
  try {
    const response = await axios.post('https://api.underdogprotocol.com/v1/collections', {
      name: text,
      description: text,
      image: media
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data["mintAddress"];
  } catch (error) {
    console.error(error);
  }
}

module.exports = createCollection

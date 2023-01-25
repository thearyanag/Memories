const axios = require("axios")

require("dotenv").config();

let token = process.env.UNDERDOG_TOKEN

/**
  to get a collection from name and owner address
*/
const getCollection = async (toSearch, Owner) => {
  try {
    const response = await axios.get('https://api.underdogprotocol.com/v1/collections', {
      params: {
        limit: 1,
        page: 1
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let collections = response.data.results

    for (let i = 0; i < collections.length; i++) {

      data = collections[i]
      if (data["name"] == toSearch && data["ownerAddress"] == Owner)
        return data["mintAddress"]
    }

    return ("not found")

  } catch (error) {
    console.error(error);
  }
}

module.exports = getCollection

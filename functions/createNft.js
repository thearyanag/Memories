const axios = require('axios');
require('dotenv').config();


let token = process.env.UNDERDOG_TOKEN

const createNft = async ( collectionAddress , name , image , ownerAddress ) => {
  try {
    const response = await axios.post('https://api.underdogprotocol.com/v1/nfts', {
      collectionAddress: collectionAddress,
      name: name,
      image: image,
      ownerAddress: ownerAddress
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

module.exports = createNft
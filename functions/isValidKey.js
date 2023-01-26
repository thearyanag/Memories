const { PublicKey } = require("@solana/web3.js");
const getWallet = require("./getWallet");

async function isValidKey(key) {
  try {
    if(key.endsWith(".sol")) {
      return await getWallet(key);
    }
    let pubKey = new PublicKey(key);
    pubKeyString = pubKey.toString();
    pubKey = pubKey.toBytes();
    if(PublicKey.isOnCurve(pubKey)) return pubKeyString;
  } catch (error) {
    return false;
  }
};

module.exports = isValidKey;
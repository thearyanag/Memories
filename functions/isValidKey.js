const { PublicKey } = require("@solana/web3.js");

module.exports = async function isValidKey(key) {
  try {
    let pubKey = new PublicKey(key);
    pubKey = pubKey.toBytes();
    return PublicKey.isOnCurve(pubKey);
  } catch (error) {
    return false;
  }
};


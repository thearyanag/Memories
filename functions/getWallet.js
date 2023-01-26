const {
  getDomainKey,
  NameRegistryState,
} = require("@bonfida/spl-name-service");
const { Connection } = require("@solana/web3.js");

async function getWallet(domainName) {
  const { pubkey } = await getDomainKey(domainName);

  let connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  try {
  const { registry, nftOwner } = await NameRegistryState.retrieve(
    connection,
    pubkey
  );

  return nftOwner ? nftOwner.toString() : registry.owner.toString();
  } catch (error) {
    return false;
  }
}

module.exports = getWallet;

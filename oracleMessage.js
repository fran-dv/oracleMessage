const {
  binToHex,
  hexToBin,
  instantiateSecp256k1,
  generatePrivateKey,
  instantiateSha256,
} = require("@bitauth/libauth");
const { randomBytes } = require("crypto");

// oracle message: {blockheight, price}
const blockHeight = 1400000; // for testnet
const price = 300; //denominated in dollar

console.log(`blockHeight: ${blockHeight}`);
console.log(`price: ${price}`);
const message = intToHex(blockHeight) + intToHex(price);
console.log(`message: ${message}`);
const messageBinary = hexToBin(message);
signMessage(messageBinary);

async function signMessage(message) {
  const secp256k1 = await instantiateSecp256k1();
  const sha256 = await instantiateSha256();

  const privKey = generatePrivateKey(() => randomBytes(32));
  const pubKey = secp256k1.derivePublicKeyCompressed(privKey);
  console.log(`pubkey: ${binToHex(pubKey)}`);

  // Hash the message.
  const messageHash = sha256.hash(message);
  // Sign the message.
  const signature = secp256k1.signMessageHashSchnorr(privKey, messageHash);
  console.log(`signature: ${binToHex(signature)}`);
}

function intToHex(int) {
  let hexBigEndian = int.toString(16);
  if (hexBigEndian.length % 2 != 0) hexBigEndian = "0" + hexBigEndian;
  let hexSmallEndian = hexBigEndian.match(/../g).reverse().join("");
  while (hexSmallEndian.length < 8) {
    hexSmallEndian = hexSmallEndian + "00";
  }
  return hexSmallEndian;
}

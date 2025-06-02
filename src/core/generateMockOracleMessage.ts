import {
  binToHex,
  hexToBin,
  instantiateSecp256k1,
  generatePrivateKey,
  instantiateSha256,
} from "@bitauth/libauth";

import { generateRandomBytes } from "@bitauth/libauth";

const intToHex = (int: number) => {
  let hexBigEndian = int.toString(16);
  if (hexBigEndian.length % 2 != 0) hexBigEndian = "0" + hexBigEndian;
  let hexSmallEndian = hexBigEndian.match(/../g)!.reverse().join("");
  while (hexSmallEndian.length < 8) {
    hexSmallEndian = hexSmallEndian + "00";
  }
  return hexSmallEndian;
};

interface MessageSignature {
  privKey: Uint8Array<ArrayBufferLike>;
  pubKey: string;
  messageHash: Uint8Array<ArrayBufferLike>;
  signature: string;
}

const signMessage = async (
  message: Uint8Array<ArrayBufferLike>,
): Promise<MessageSignature> => {
  const secp256k1 = await instantiateSecp256k1();
  const sha256 = await instantiateSha256();

  const privKey = generatePrivateKey(() => generateRandomBytes(32));
  const pubKey = binToHex(
    secp256k1.derivePublicKeyCompressed(privKey) as Uint8Array<ArrayBufferLike>,
  );

  // Hash the message.
  const messageHash = sha256.hash(message);
  // Sign the message.
  const signature = binToHex(
    secp256k1.signMessageHashSchnorr(
      privKey,
      messageHash,
    ) as Uint8Array<ArrayBufferLike>,
  );

  return {
    privKey,
    pubKey,
    messageHash,
    signature,
  };
};

interface MockOracleMessageData {
  blockHeight: number;
  price: number; // in USD
  messageHex: string;
  messageBinary: Uint8Array<ArrayBufferLike>;
  messageHash: Uint8Array<ArrayBufferLike>;
  pubKey: string;
  signature: string;
}

export const generateMockOracleMessage = async (): Promise<
  MockOracleMessageData | Error
> => {
  const blockHeight = 1650000;
  const price = 350;

  const messageHex = intToHex(blockHeight) + intToHex(price);
  const messageBinary = hexToBin(messageHex);

  const { pubKey, messageHash, signature }: MessageSignature =
    await signMessage(messageBinary).catch((err) => {
      console.error(err.message);
      return err;
    });

  return {
    blockHeight,
    price,
    messageHex,
    messageBinary,
    messageHash,
    pubKey,
    signature,
  };
};

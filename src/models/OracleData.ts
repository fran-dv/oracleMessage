export interface MockOracleMessageData {
  blockHeight: number;
  price: number; // in USD
  messageHex: string;
  messageBinary: Uint8Array<ArrayBufferLike>;
  messageHash: Uint8Array<ArrayBufferLike>;
  pubKey: string;
  signature: string;
}

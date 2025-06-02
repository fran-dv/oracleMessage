import { useState } from "react";
import "./MockOracleMessagesGenerator.css";
import type { MockOracleMessageData } from "@/models";
import { generateMockOracleMessage } from "@/core";
import { TextCopy } from "@/components";

export const MockOracleMessagesGenerator = () => {
  const [oracleMessage, setOracleMessage] =
    useState<MockOracleMessageData | null>(null);

  const handleButtonClick = async () => {
    const newMessage = await generateMockOracleMessage();
    if (newMessage instanceof Error) {
      console.error(newMessage.message);
      return;
    }
    setOracleMessage(newMessage);
  };

  return (
    <div className="oracle-message-generator">
      <h1>Mock oracle message generator</h1>
      <div className="message-data">
        <div className="data-section">
          <h2>Block Height: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.blockHeight}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Price: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.price}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Message Hex: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.messageHex}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Message Binary: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.messageBinary}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Message Hash: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.messageHash}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Publick key: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.pubKey}</p>
          </TextCopy>
        </div>
        <div className="data-section">
          <h2>Signature: </h2>
          <TextCopy>
            <p className="data-p">{oracleMessage?.signature}</p>
          </TextCopy>
        </div>
      </div>

      <button className="generate-btn" onClick={handleButtonClick}>
        <p>Generate message</p>
      </button>
      <p>
        (This data is not real; it’s mock data used for development, learning,
        and testing purposes.)
      </p>
    </div>
  );
};

import { useRef, useState } from "react";
import "./TextCopy.css";

interface Props {
  children: React.ReactNode;
}

export const TextCopy = ({ children }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const textToCopyRef = useRef<HTMLSpanElement>(null);

  const handleClick = async () => {
    if (copied || !textToCopyRef.current) {
      return;
    }

    const textToCopy = textToCopyRef.current.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error(`Failed to copy text: ${err}`);
    }
  };

  return (
    <div className="text-copy-container">
      <span onClick={handleClick} className="text-to-copy" ref={textToCopyRef}>
        {children}
      </span>
      {copied && (
        <div className="copied-alert">
          <p>Copied!</p>
        </div>
      )}
    </div>
  );
};

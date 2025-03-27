"use client";

import { useState } from "react";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // encode or decode
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setError("");
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setError("Invalid input for encoding. Make sure to use UTF-8 compatible text.");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setError("Invalid Base64 string. Please check your input.");
      setOutput("");
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please enter some text to convert");
      return;
    }
    
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleModeChange("encode")}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
            mode === "encode"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
            mode === "decode"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          placeholder={
            mode === "encode"
              ? "Enter text to convert to Base64..."
              : "Enter Base64 string to decode..."
          }
        />
      </div>

      <button
        onClick={handleConvert}
        className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
      >
        {mode === "encode" ? "Convert to Base64" : "Decode Base64"}
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-32 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>
      )}

      {mode === "encode" && output && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Original length: {input.length} characters
          <br />
          Encoded length: {output.length} characters
        </div>
      )}
    </div>
  );
}

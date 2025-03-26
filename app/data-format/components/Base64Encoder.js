"use client";

import { useState } from "react";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'

  const handleEncodeDecode = () => {
    if (mode === "encode") {
      try {
        setOutput(btoa(input));
      } catch (error) {
        setOutput("Error: Input contains characters that cannot be encoded");
      }
    } else {
      try {
        setOutput(atob(input));
      } catch (error) {
        setOutput("Error: Invalid Base64 encoding");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Base64 Encoder/Decoder
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Encode data to Base64 or decode Base64 data back to its original form.
        </p>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              mode === "encode"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              mode === "decode"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input
          </label>
          <textarea
            id="input"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode"
                : "Enter text to decode"
            }
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleEncodeDecode}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
        </div>

        <div>
          <label
            htmlFor="output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Result
          </label>
          <textarea
            id="output"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

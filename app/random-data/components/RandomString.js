"use client";

import { useState } from "react";

export default function RandomString() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [charset, setCharset] = useState("alphanumeric");
  const [customCharset, setCustomCharset] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [strings, setStrings] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const charsets = {
    alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    hex: "0123456789ABCDEF",
    custom: customCharset,
  };

  const validateInputs = () => {
    if (length < 1) {
      setError("Length must be at least 1");
      return false;
    }

    if (count < 1 || count > 1000) {
      setError("Count must be between 1 and 1000");
      return false;
    }

    if (charset === "custom" && customCharset.length === 0) {
      setError("Custom charset cannot be empty");
      return false;
    }

    setError("");
    return true;
  };

  const generateStrings = () => {
    if (!validateInputs()) return;

    const chars = charsets[charset];
    const results = [];

    for (let i = 0; i < count; i++) {
      let result = "";
      for (let j = 0; j < length; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      results.push(`${prefix}${result}${suffix}`);
    }

    setStrings(results);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(strings.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetLengths = [8, 16, 32, 64];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            String Length
          </label>
          <input
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Strings
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presetLengths.map((preset) => (
          <button
            key={preset}
            onClick={() => setLength(preset)}
            className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {preset} characters
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Character Set
        </label>
        <select
          value={charset}
          onChange={(e) => setCharset(e.target.value)}
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="alphanumeric">Alphanumeric (A-Z, a-z, 0-9)</option>
          <option value="alphabetic">Alphabetic (A-Z, a-z)</option>
          <option value="uppercase">Uppercase (A-Z)</option>
          <option value="lowercase">Lowercase (a-z)</option>
          <option value="numeric">Numeric (0-9)</option>
          <option value="hex">Hexadecimal (0-9, A-F)</option>
          <option value="custom">Custom Character Set</option>
        </select>
      </div>

      {charset === "custom" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Character Set
          </label>
          <input
            type="text"
            value={customCharset}
            onChange={(e) => setCustomCharset(e.target.value)}
            placeholder="Enter characters to use..."
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prefix (Optional)
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suffix (Optional)
          </label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={generateStrings}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Generate Strings
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {strings.length > 0 && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={strings.join("\n")}
              readOnly
              rows={Math.min(10, strings.length)}
              className="w-full p-3 pr-20 font-mono bg-gray-50 dark:bg-gray-800 rounded-lg"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-2 text-sm text-primary hover:text-primary-dark"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

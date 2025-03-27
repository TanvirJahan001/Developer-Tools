"use client";

import { useState } from "react";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const validateInputs = () => {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum)) {
      setError("Min and max must be valid numbers");
      return false;
    }

    if (minNum >= maxNum) {
      setError("Maximum must be greater than minimum");
      return false;
    }

    if (countNum < 1) {
      setError("Count must be at least 1");
      return false;
    }

    if (unique && (maxNum - minNum + 1) < countNum) {
      setError("Not enough unique numbers in the specified range");
      return false;
    }

    setError("");
    return true;
  };

  const generateNumbers = () => {
    if (!validateInputs()) return;

    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);
    const countNum = parseInt(count);
    const places = parseInt(decimalPlaces);
    
    let result = [];
    const multiplier = Math.pow(10, places);

    if (unique) {
      // For unique numbers, generate all possible numbers and shuffle
      const allNumbers = [];
      for (let i = minNum * multiplier; i <= maxNum * multiplier; i++) {
        allNumbers.push(i / multiplier);
      }

      // Fisher-Yates shuffle
      for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
      }

      result = allNumbers.slice(0, countNum);
    } else {
      // For non-unique numbers, generate randomly
      for (let i = 0; i < countNum; i++) {
        const random = Math.random() * (maxNum - minNum) + minNum;
        const rounded = Math.round(random * multiplier) / multiplier;
        result.push(rounded);
      }
    }

    setNumbers(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(numbers.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetRanges = [
    { name: "Dice (1-6)", min: 1, max: 6 },
    { name: "Percentage (0-100)", min: 0, max: 100 },
    { name: "Cards (1-52)", min: 1, max: 52 },
    { name: "Bytes (0-255)", min: 0, max: 255 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Value
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Value
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presetRanges.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              setMin(preset.min);
              setMax(preset.max);
            }}
            className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Results
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Decimal Places
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={decimalPlaces}
            onChange={(e) => setDecimalPlaces(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={unique}
          onChange={(e) => setUnique(e.target.checked)}
          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Generate Unique Numbers Only
        </span>
      </label>

      <button
        onClick={generateNumbers}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Generate Numbers
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {numbers.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated Numbers
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-60 overflow-y-auto">
            {numbers.map((number, index) => (
              <div
                key={index}
                className="font-mono text-gray-900 dark:text-white"
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [error, setError] = useState("");

  const generatePassword = () => {
    setError("");

    // Validate settings
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setError("Please select at least one character type");
      return;
    }

    // Define character sets
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

    // Combine selected character sets
    let chars = "";
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    // Generate password
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    // Ensure at least one character from each selected type
    let finalPassword = newPassword;
    if (includeUppercase && !/[A-Z]/.test(finalPassword)) {
      const randomChar =
        uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
      const randomPos = Math.floor(Math.random() * finalPassword.length);
      finalPassword =
        finalPassword.substring(0, randomPos) +
        randomChar +
        finalPassword.substring(randomPos + 1);
    }
    if (includeLowercase && !/[a-z]/.test(finalPassword)) {
      const randomChar =
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
      const randomPos = Math.floor(Math.random() * finalPassword.length);
      finalPassword =
        finalPassword.substring(0, randomPos) +
        randomChar +
        finalPassword.substring(randomPos + 1);
    }
    if (includeNumbers && !/[0-9]/.test(finalPassword)) {
      const randomChar =
        numberChars[Math.floor(Math.random() * numberChars.length)];
      const randomPos = Math.floor(Math.random() * finalPassword.length);
      finalPassword =
        finalPassword.substring(0, randomPos) +
        randomChar +
        finalPassword.substring(randomPos + 1);
    }
    if (
      includeSymbols &&
      !/[!@#$%^&*()_+~`|}{\[\]\\:;?><,.\/-=]/.test(finalPassword)
    ) {
      const randomChar =
        symbolChars[Math.floor(Math.random() * symbolChars.length)];
      const randomPos = Math.floor(Math.random() * finalPassword.length);
      finalPassword =
        finalPassword.substring(0, randomPos) +
        randomChar +
        finalPassword.substring(randomPos + 1);
    }

    setPassword(finalPassword);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Password Generator
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create strong, secure passwords with customizable length and character
          sets.
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="length"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="uppercase"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Uppercase (A-Z)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="lowercase"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Lowercase (a-z)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="numbers"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Numbers (0-9)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="symbols"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Symbols (!@#$%)
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          onClick={generatePassword}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Generate Password
        </button>
      </div>

      {password && (
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Password
          </label>
          <div className="flex">
            <input
              type="text"
              id="password"
              value={password}
              readOnly
              className="flex-grow px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

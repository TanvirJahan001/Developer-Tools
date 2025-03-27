"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    similar: false,
    ambiguous: false,
  });
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "iIlL1oO0",
    ambiguous: "`{}[]()\/'\"`~,;:.<>",
  };

  const calculateStrength = (password) => {
    let score = 0;
    
    // Length contribution
    score += Math.min(password.length * 4, 40);

    // Character variety contribution
    if (/[A-Z]/.test(password)) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    // Penalty for repeating characters
    const repeats = password.length - new Set(password).size;
    score -= repeats * 3;

    return Math.max(0, Math.min(100, score));
  };

  const validateOptions = () => {
    if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
      setError("Select at least one character type");
      return false;
    }

    if (length < 8) {
      setError("Password length must be at least 8 characters");
      return false;
    }

    if (count < 1 || count > 100) {
      setError("Number of passwords must be between 1 and 100");
      return false;
    }

    setError("");
    return true;
  };

  const generatePassword = () => {
    if (!validateOptions()) return;

    let chars = "";
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;

    // Remove similar/ambiguous characters if specified
    if (!options.similar) {
      chars = chars.split('')
        .filter(char => !charSets.similar.includes(char))
        .join('');
    }
    if (!options.ambiguous) {
      chars = chars.split('')
        .filter(char => !charSets.ambiguous.includes(char))
        .join('');
    }

    const results = [];
    for (let i = 0; i < count; i++) {
      let password = "";
      // Ensure at least one character from each selected type
      if (options.uppercase) password += charSets.uppercase[Math.floor(Math.random() * charSets.uppercase.length)];
      if (options.lowercase) password += charSets.lowercase[Math.floor(Math.random() * charSets.lowercase.length)];
      if (options.numbers) password += charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)];
      if (options.symbols) password += charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)];

      // Fill the rest randomly
      while (password.length < length) {
        password += chars[Math.floor(Math.random() * chars.length)];
      }

      // Shuffle the password
      password = password.split('')
        .sort(() => Math.random() - 0.5)
        .join('');

      results.push(password);
    }

    setPasswords(results);
    setStrength(calculateStrength(results[0]));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passwords.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetLengths = [12, 16, 24, 32];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Length
          </label>
          <input
            type="number"
            min="8"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Passwords
          </label>
          <input
            type="number"
            min="1"
            max="100"
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

      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Character Types
        </div>
        {Object.entries({
          uppercase: "Uppercase Letters (A-Z)",
          lowercase: "Lowercase Letters (a-z)",
          numbers: "Numbers (0-9)",
          symbols: "Special Characters (!@#$%^&*)",
          similar: "Include Similar Characters (1, l, I, O, 0)",
          ambiguous: "Include Ambiguous Characters ({ } [ ] ( ) / \\ ' \" ` ~)",
        }).map(([key, label]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              className="form-checkbox h-5 w-5 text-primary rounded border-gray-300"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={generatePassword}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Generate Passwords
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {passwords.length > 0 && (
        <div className="space-y-4">
          {strength > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password Strength
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {strength}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${
                    strength > 80 ? "bg-green-600" :
                    strength > 60 ? "bg-yellow-400" :
                    strength > 40 ? "bg-orange-500" :
                    "bg-red-600"
                  }`}
                  style={{ width: `${strength}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="relative">
            <textarea
              value={passwords.join("\n")}
              readOnly
              rows={Math.min(10, passwords.length)}
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

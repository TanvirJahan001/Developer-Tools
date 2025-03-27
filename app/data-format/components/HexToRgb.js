"use client";

import { useState } from "react";

export default function HexToRgb() {
  const [hexInput, setHexInput] = useState("");
  const [rgbOutput, setRgbOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewColor, setPreviewColor] = useState("#FFFFFF");
  const [outputFormat, setOutputFormat] = useState("rgb"); // rgb, css, array

  const isValidHex = (hex) => {
    const regex = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    return regex.test(hex);
  };

  const convertHexToRgb = (hex) => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
      hex = hex.split("").map(char => char + char).join("");
    }

    // Convert to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  };

  const formatRgbOutput = (rgb) => {
    switch (outputFormat) {
      case "rgb":
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      case "css":
        return `--color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});`;
      case "array":
        return `[${rgb[0]}, ${rgb[1]}, ${rgb[2]}]`;
      default:
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
  };

  const handleHexChange = (value) => {
    setHexInput(value);
    
    // Auto-add # if not present
    if (value.length > 0 && !value.startsWith("#")) {
      value = "#" + value;
    }

    if (isValidHex(value)) {
      setError("");
      const rgb = convertHexToRgb(value);
      setRgbOutput(formatRgbOutput(rgb));
      setPreviewColor(value);
    } else {
      setError(value.length > 0 ? "Invalid hex color code" : "");
      setRgbOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rgbOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Common color presets
  const colorPresets = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Hex Color Code
        </label>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="#000000"
          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {colorPresets.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleHexChange(color.hex)}
            className="px-3 py-1 rounded border text-sm"
            style={{
              backgroundColor: color.hex,
              color: ["#FFFFFF", "#FFFF00", "#00FFFF"].includes(color.hex) ? "#000000" : "#FFFFFF",
            }}
          >
            {color.name}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Output Format:
        </label>
        <select
          value={outputFormat}
          onChange={(e) => {
            setOutputFormat(e.target.value);
            if (rgbOutput) {
              const rgb = convertHexToRgb(hexInput);
              setRgbOutput(formatRgbOutput(rgb));
            }
          }}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="rgb">RGB</option>
          <option value="css">CSS Variable</option>
          <option value="array">Array</option>
        </select>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {rgbOutput && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              RGB Output
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <div className="flex space-x-4">
            <input
              readOnly
              value={rgbOutput}
              className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            />
            <div
              className="w-12 h-12 rounded-lg border"
              style={{ backgroundColor: previewColor }}
              title="Color Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}


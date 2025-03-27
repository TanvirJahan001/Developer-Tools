"use client";

import { useState } from "react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [version, setVersion] = useState("v4");
  const [copied, setCopied] = useState(null);

  const generateUUID = () => {
    // UUID v4 implementation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // UUID v1-like implementation (time-based)
  const generateTimeBasedUUID = () => {
    const now = new Date().getTime();
    const timeHex = now.toString(16).padStart(12, '0');
    return `${timeHex.slice(0,8)}-${timeHex.slice(8,12)}-1${timeHex.slice(12,15)}-${Math.floor(Math.random() * 4 + 8).toString(16)}${Math.random().toString(16).slice(2,5)}-${Math.random().toString(16).slice(2,14)}`;
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: quantity }, () => 
      version === "v4" ? generateUUID() : generateTimeBasedUUID()
    );
    setUuids(newUuids);
    setCopied(null);
  };

  const handleCopy = (uuid, index) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = () => {
    const allUuids = uuids.join('\n');
    navigator.clipboard.writeText(allUuids);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            UUID Version
          </label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="v4">Version 4 (Random)</option>
            <option value="v1">Version 1 (Time-based)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Generate UUID{quantity > 1 ? 's' : ''}
      </button>

      {uuids.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Generated UUIDs
            </h3>
            {uuids.length > 1 && (
              <button
                onClick={handleCopyAll}
                className="text-sm text-primary hover:text-primary-dark"
              >
                {copied === 'all' ? 'Copied all!' : 'Copy all'}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-800"
              >
                <code className="font-mono text-sm text-gray-900 dark:text-white">
                  {uuid}
                </code>
                <button
                  onClick={() => handleCopy(uuid, index)}
                  className="ml-4 text-sm text-primary hover:text-primary-dark"
                >
                  {copied === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

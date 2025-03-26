"use client";

import { useState } from "react";

export default function WordCounter() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    lines: 0,
    paragraphs: 0,
  });

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);

    // Calculate statistics
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, "").length;
    const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
    const paragraphs =
      text === ""
        ? 0
        : text
            .split(/\r\n\s*\r\n|\r\s*\r|\n\s*\n/)
            .filter((p) => p.trim().length > 0).length;

    setStats({
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
    });
  };

  const handleClear = () => {
    setInput("");
    setStats({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      lines: 0,
      paragraphs: 0,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Word Counter
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Count words, characters, lines, and paragraphs in your text.
        </p>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input Text
          </label>
          <textarea
            id="input"
            rows={8}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            value={input}
            onChange={handleInputChange}
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Clear Text
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Text Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Words</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.words}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Characters
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.characters}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Characters (no spaces)
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.charactersNoSpaces}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Lines</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.lines}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paragraphs
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.paragraphs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

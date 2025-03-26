"use client";
import { useState } from "react";

export default function HtmlPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  // Simple HTML prettifier function
  const prettifyHtml = (html, spaces) => {
    let result = "";
    let indentLevel = 0;
    let inTag = false;
    let inContent = false;
    let currentChar = null;
    let previousChar = null;
    let tagContent = "";

    const indent = " ".repeat(spaces);

    // Helper function to add a line break and indent
    const addBreakAndIndent = () => {
      result += "\n" + indent.repeat(indentLevel);
    };

    // Process each character in the HTML string
    for (let i = 0; i < html.length; i++) {
      currentChar = html[i];
      previousChar = html[i - 1];

      if (inTag) {
        // Inside a tag
        tagContent += currentChar;
        if (currentChar === ">") {
          inTag = false;
          result += tagContent;
          tagContent = "";

          // Check if it's a closing tag or self-closing tag
          if (previousChar === "/" || /^<\//.test(tagContent)) {
            indentLevel--;
          } else if (
            !/^<!--|^<!DOCTYPE|^<br|^<hr|^<img|^<input|^<link|^<meta/.test(
              tagContent
            )
          ) {
            // Not a comment, doctype, or self-closing tag
            indentLevel++;
            addBreakAndIndent();
          }
        }
      } else if (currentChar === "<") {
        // Start of a new tag
        inTag = true;
        tagContent = "<";
        inContent = false;
      } else {
        // Text content
        if (!inContent) {
          inContent = true;
          addBreakAndIndent();
        }
        result += currentChar;
      }
    }

    return result.trim();
  };

  const handlePrettify = () => {
    setError("");
    try {
      const prettified = prettifyHtml(input, indentSize);
      setOutput(prettified);
    } catch (err) {
      setError("Error: " + err.message);
      setOutput("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          HTML Prettify
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Structure HTML code with proper indentation for better readability and
          maintenance.
        </p>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="indentSize"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Indent Size
          </label>
          <select
            id="indentSize"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            HTML Input
          </label>
          <textarea
            id="input"
            rows={6}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div><h1>Hello World</h1><p>This is a paragraph.</p></div>"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={handlePrettify}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Prettify HTML
          </button>
        </div>

        <div>
          <label
            htmlFor="output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Formatted HTML
          </label>
          <textarea
            id="output"
            rows={10}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

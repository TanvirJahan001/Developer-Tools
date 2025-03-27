"use client";

import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const availableFlags = [
    { value: "g", label: "Global", description: "Match all occurrences" },
    { value: "i", label: "Case Insensitive", description: "Case-insensitive matching" },
    { value: "m", label: "Multiline", description: "^ and $ match start/end of each line" },
    { value: "s", label: "Dotall", description: ". matches newlines" },
    { value: "u", label: "Unicode", description: "Enable unicode support" },
    { value: "y", label: "Sticky", description: "Match from lastIndex only" },
  ];

  const testRegex = () => {
    if (!pattern.trim()) {
      setError("Please enter a regular expression pattern");
      setResults(null);
      return;
    }

    if (!testString.trim()) {
      setError("Please enter a test string");
      setResults(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
            input: match.input,
          });
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
            input: match.input,
          });
        }
      }

      setResults({
        matches,
        totalMatches: matches.length,
        test: regex.test(testString),
      });
      setError("");
    } catch (err) {
      setError(`Invalid regular expression: ${err.message}`);
      setResults(null);
    }
  };

  const handleFlagToggle = (flag) => {
    setFlags(prev => 
      prev.includes(flag) 
        ? prev.replace(flag, "") 
        : prev + flag
    );
  };

  const highlightMatches = () => {
    if (!results?.matches.length) return testString;

    let highlighted = testString;
    let offset = 0;

    results.matches.forEach(match => {
      const prefix = '<span class="bg-yellow-200 dark:bg-yellow-800">';
      const suffix = '</span>';
      
      const startPos = match.index + offset;
      const endPos = startPos + match.fullMatch.length;
      
      highlighted = 
        highlighted.slice(0, startPos) +
        prefix +
        highlighted.slice(startPos, endPos) +
        suffix +
        highlighted.slice(endPos);
      
      offset += prefix.length + suffix.length;
    });

    return highlighted;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Regular Expression Pattern
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern (e.g., \b\w+@\w+\.\w+\b)"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Flags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFlags.map(flag => (
              <button
                key={flag.value}
                onClick={() => handleFlagToggle(flag.value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  flags.includes(flag.value)
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                title={flag.description}
              >
                {flag.label} ({flag.value})
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex pattern"
            rows={5}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
          />
        </div>

        <button
          onClick={testRegex}
          className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
        >
          Test Regex
        </button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Results
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Total Matches: {results.totalMatches}
                </p>
                <div className="font-mono text-sm whitespace-pre-wrap" 
                     dangerouslySetInnerHTML={{ __html: highlightMatches() }} 
                />
              </div>
            </div>

            {results.matches.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Match Details
                </h4>
                {results.matches.map((match, index) => (
                  <div key={index} className="p-3 bg-white dark:bg-gray-800 border rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Match {index + 1}:
                    </p>
                    <pre className="mt-1 text-sm font-mono overflow-x-auto">
                      {JSON.stringify(match, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

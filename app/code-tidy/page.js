'use client';

import { useState } from 'react';
import Layout from "../../components/Layout";
import PrimaryButton from '../../components/PrimaryButton';
import CssMinify from './components/CssMinify';
import HtmlPrettify from './components/HtmlPrettify';
import JavascriptMinify from './components/JavascriptMinify';
import JsonPrettify from './components/JsonPrettify';
import XmlPrettify from './components/XmlPrettify';

export default function CodeTidy() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "json-prettify":
        return <JsonPrettify />;
      case "xml-prettify":
        return <XmlPrettify />;
      case "html-prettify":
        return <HtmlPrettify />;
      case "css-minify":
        return <CssMinify />;
      case "js-minify":
        return <JavascriptMinify />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Code Tidy Tools
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Format, prettify, and minify your code with ease
          </p>
        </div>

        {activeTool ? (
          <div className="mt-8">
            <button
              onClick={() => setActiveTool(null)}
              className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              ← Back to Tools
            </button>
            {renderTool()}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* JSON Prettify */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 10l9 9l9-9"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        JSON Prettifier
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Format JSON data for enhanced readability with proper indentation.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("json-prettify")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* XML Prettify */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        XML Prettifier
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Format XML data with proper indentation and structure for better readability.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("xml-prettify")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* HTML Prettify */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        HTML Prettifier
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Format HTML code with proper indentation for better readability and maintenance.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("html-prettify")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* CSS Minify */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        CSS Minifier
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Minify CSS code to reduce file size and improve loading times.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("css-minify")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* JavaScript Minify */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        JavaScript Minifier
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Minify JavaScript code to reduce file size and improve loading times.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("js-minify")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

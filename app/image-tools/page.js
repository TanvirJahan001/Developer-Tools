"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/PrimaryButton";
import BulkProcessing from "./components/BulkProcessing";
import FormatConverter from "./components/FormatConverter";
import ImageCompressor from "./components/ImageCompressor";
import ImageResizer from "./components/ImageResizer";

export default function ImageTools() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "resizer":
        return <ImageResizer />;
      case "converter":
        return <FormatConverter />;
      case "compressor":
        return <ImageCompressor />;
      case "bulk":
        return <BulkProcessing />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Image Tools
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Resize, convert, and optimize your images with ease
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
            {/* Image Resizer */}
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Image Resizer
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Resize images to specific dimensions while maintaining aspect ratio
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("resizer")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Format Converter */}
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Format Converter
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Convert images between different formats (PNG, JPEG, WebP)
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("converter")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Image Compressor */}
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
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Image Compressor
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Compress images to reduce file size while maintaining quality
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("compressor")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Bulk Processing */}
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Bulk Processing
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Process multiple images at once with various operations
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("bulk")}>
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

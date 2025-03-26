"use client";
import { useState } from "react";

export default function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store original file size
      setOriginalSize(file.size);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setCompressedImage(null);
        setCompressedSize(0);

        // Extract filename without extension
        const name = file.name.split(".")[0];
        setFileName(name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQualityChange = (e) => {
    setQuality(parseFloat(e.target.value));
  };

  const compressImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setCompressedImage(url);
          setCompressedSize(blob.size);
        },
        "image/jpeg",
        quality
      );
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `${fileName}-compressed.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Calculate compression percentage
  const compressionPercentage = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    const reduction = ((originalSize - compressedSize) / originalSize) * 100;
    return Math.max(0, Math.round(reduction)); // Ensure it's not negative
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Image Compressor
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-primary/10 file:text-primary
            hover:file:bg-primary/20
            cursor-pointer"
        />
      </div>

      {image && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compression Quality: {quality * 100}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={handleQualityChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Higher Compression</span>
              <span>Better Quality</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <button
              onClick={compressImage}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Compress Image
            </button>
            {compressedImage && (
              <button
                onClick={downloadImage}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download Compressed Image
              </button>
            )}
          </div>

          {compressedImage && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Compression Results
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Original Image
                  </h4>
                  <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt="Original"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Size: {formatFileSize(originalSize)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compressed Image
                  </h4>
                  <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={compressedImage}
                      alt="Compressed"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Size: {formatFileSize(compressedSize)}
                  </p>
                </div>
              </div>

              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                {compressedImage ? (
                  <img
                    src={compressedImage}
                    alt="Compressed"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Compressed preview will appear here
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Size: {formatFileSize(compressedSize)}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

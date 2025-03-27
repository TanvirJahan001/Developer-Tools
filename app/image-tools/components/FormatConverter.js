"use client";
import Image from "next/image";
import { useState } from "react";

export default function FormatConverter() {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState("image/png");
  const [quality, setQuality] = useState(0.9);
  const [convertedImage, setConvertedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);

  const formats = [
    { value: "image/png", label: "PNG", extension: "png", supportsQuality: false },
    { value: "image/jpeg", label: "JPEG", extension: "jpg", supportsQuality: true },
    { value: "image/webp", label: "WebP", extension: "webp", supportsQuality: true },
    { value: "image/gif", label: "GIF", extension: "gif", supportsQuality: false },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setConvertedImage(null);
        
        // Extract filename without extension
        const name = file.name.split(".")[0];
        setFileName(name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleQualityChange = (e) => {
    setQuality(parseFloat(e.target.value));
  };

  const convertImage = () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setError(null);
    const canvas = document.createElement("canvas");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      // Convert to the selected format
      const dataUrl = canvas.toDataURL(format, quality);
      setConvertedImage(dataUrl);
    };
    
    img.src = image;
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const selectedFormat = formats.find(f => f.value === format);
    const extension = selectedFormat ? selectedFormat.extension : "png";
    
    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `${fileName}-converted.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Image Format Converter
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

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      {image && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Convert to Format
              </label>
              <select
                value={format}
                onChange={handleFormatChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                {formats.map((fmt) => (
                  <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                ))}
              </select>
            </div>

            {formats.find(f => f.value === format)?.supportsQuality && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quality ({Math.round(quality * 100)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={handleQualityChange}
                  className="w-full mt-2"
                />
              </div>
            )}
          </div>

          <button
            onClick={convertImage}
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Convert Image
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Original Image</h3>
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                <Image
                  src={image}
                  alt="Original"
                  fill
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Converted Image</h3>
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                {convertedImage ? (
                  <Image
                    src={convertedImage}
                    alt="Converted"
                    fill
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Converted preview will appear here
                  </div>
                )}
              </div>
            </div>
          </div>

          {convertedImage && (
            <button
              onClick={downloadImage}
              className="mt-6 w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Download Converted Image
            </button>
          )}
        </>
      )}
    </div>
  );
}

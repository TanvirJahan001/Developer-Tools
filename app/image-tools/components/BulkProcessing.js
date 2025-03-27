"use client";
import Image from "next/image";
import { useState } from "react";

export default function BulkProcessing() {
  const [images, setImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [settings, setSettings] = useState({
    resize: { enabled: false, width: 800, height: 600 },
    compress: { enabled: false, quality: 0.7 },
    format: { enabled: false, type: "image/jpeg" },
  });

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            original: e.target.result,
            processed: null,
            size: file.size
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(loadedImages => {
      setImages(loadedImages);
      setProcessedImages([]);
    });
  };

  const processImages = async () => {
    const processed = await Promise.all(images.map(async (img) => {
      let processedImage = img.original;
      const canvas = document.createElement("canvas");
      const image = new Image();

      await new Promise((resolve) => {
        image.onload = resolve;
        image.src = processedImage;
      });

      // Apply resize if enabled
      if (settings.resize.enabled) {
        canvas.width = settings.resize.width;
        canvas.height = settings.resize.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, settings.resize.width, settings.resize.height);
        processedImage = canvas.toDataURL(settings.format.enabled ? settings.format.type : "image/png");
      }

      // Apply compression if enabled
      if (settings.compress.enabled) {
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        processedImage = canvas.toDataURL(settings.format.enabled ? settings.format.type : "image/png", settings.compress.quality);
      }

      // Apply format conversion if enabled
      if (settings.format.enabled && !settings.compress.enabled && !settings.resize.enabled) {
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        processedImage = canvas.toDataURL(settings.format.type);
      }

      return {
        ...img,
        processed: processedImage
      };
    }));

    setProcessedImages(processed);
  };

  const downloadAll = () => {
    processedImages.forEach((img, index) => {
      const link = document.createElement("a");
      const extension = settings.format.enabled 
        ? settings.format.type.split("/")[1] 
        : "png";
      link.href = img.processed;
      link.download = `processed-${img.name.split(".")[0]}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Bulk Image Processing
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-primary/10 file:text-primary
            hover:file:bg-primary/20
            cursor-pointer"
        />
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {/* Processing Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resize Option */}
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resize Images
                </label>
                <input
                  type="checkbox"
                  checked={settings.resize.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    resize: { ...settings.resize, enabled: e.target.checked }
                  })}
                  className="rounded text-primary focus:ring-primary"
                />
              </div>
              {settings.resize.enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Width</label>
                    <input
                      type="number"
                      value={settings.resize.width}
                      onChange={(e) => setSettings({
                        ...settings,
                        resize: { ...settings.resize, width: parseInt(e.target.value) }
                      })}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Height</label>
                    <input
                      type="number"
                      value={settings.resize.height}
                      onChange={(e) => setSettings({
                        ...settings,
                        resize: { ...settings.resize, height: parseInt(e.target.value) }
                      })}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Compression Option */}
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Compress Images
                </label>
                <input
                  type="checkbox"
                  checked={settings.compress.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    compress: { ...settings.compress, enabled: e.target.checked }
                  })}
                  className="rounded text-primary focus:ring-primary"
                />
              </div>
              {settings.compress.enabled && (
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Quality ({Math.round(settings.compress.quality * 100)}%)
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={settings.compress.quality}
                    onChange={(e) => setSettings({
                      ...settings,
                      compress: { ...settings.compress, quality: parseFloat(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Format Option */}
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Convert Format
                </label>
                <input
                  type="checkbox"
                  checked={settings.format.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    format: { ...settings.format, enabled: e.target.checked }
                  })}
                  className="rounded text-primary focus:ring-primary"
                />
              </div>
              {settings.format.enabled && (
                <div>
                  <select
                    value={settings.format.type}
                    onChange={(e) => setSettings({
                      ...settings,
                      format: { ...settings.format, type: e.target.value }
                    })}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={processImages}
              className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
            >
              Process Images
            </button>
            {processedImages.length > 0 && (
              <button
                onClick={downloadAll}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download All
              </button>
            )}
          </div>

          {/* Image Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {img.name}
                </h3>
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                  <Image
                    src={processedImages[index]?.processed || img.original}
                    alt={img.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

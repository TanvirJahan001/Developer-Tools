"use client";
import { useState } from "react";

export default function ImageResizer() {
  const [image, setImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [originalDimensions, setOriginalDimensions] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResizedImage(null);

        // Extract filename without extension
        const name = file.name.split(".")[0];
        setFileName(name);

        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setDimensions({ width: img.width, height: img.height });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newHeight = Math.round(newWidth / aspectRatio);
      setDimensions({ width: newWidth, height: newHeight });
    } else {
      setDimensions({ ...dimensions, width: newWidth });
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newWidth = Math.round(newHeight * aspectRatio);
      setDimensions({ width: newWidth, height: newHeight });
    } else {
      setDimensions({ ...dimensions, height: newHeight });
    }
  };

  const toggleAspectRatio = () => {
    setMaintainAspectRatio(!maintainAspectRatio);
  };

  const resizeImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Draw the resized image
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/png");
      setResizedImage(dataUrl);
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (!resizedImage) return;

    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `${fileName}-resized.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Image Resizer
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={dimensions.width}
                onChange={handleWidthChange}
                min="1"
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={dimensions.height}
                onChange={handleHeightChange}
                min="1"
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="maintain-aspect-ratio"
              type="checkbox"
              checked={maintainAspectRatio}
              onChange={toggleAspectRatio}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="maintain-aspect-ratio"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Maintain aspect ratio
            </label>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={resizeImage}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Resize Image
            </button>
            {resizedImage && (
              <button
                onClick={downloadImage}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download Resized Image
              </button>
            )}
          </div>

          {resizedImage && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Preview
              </h3>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <img
                  src={resizedImage}
                  alt="Resized Preview"
                  className="max-w-full h-auto"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Resized to {dimensions.width} × {dimensions.height} pixels
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

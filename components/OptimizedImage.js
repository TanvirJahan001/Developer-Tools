'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
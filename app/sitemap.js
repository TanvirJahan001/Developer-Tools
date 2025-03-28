export default async function sitemap() {
  const baseUrl = 'https://developer-tools-alpha.vercel.app';

  // Add lastModified dates for better SEO
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/code-tidy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/data-format`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/random-data`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/utilities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/image-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ].map(route => ({
    ...route,
    alternateRefs: [
      {
        href: route.url.replace(baseUrl, 'https://developer-tools-alpha.vercel.app'),
        hreflang: 'en',
      },
    ],
  }));

  
  const toolRoutes = [
    // Code Tidy Tools
    'json-prettify',
    'html-prettify',
    'css-minify',
    'javascript-minify',
    'xml-prettify',
    // Data Format Tools
    'url-encoder',
    'base64-encode',
    'json-to-csv',
    'yaml-to-json',
    'hex-to-rgb',
    // Random Data Tools
    'uuid-generator',
    'random-number',
    'password-generator',
    'random-string',
    // Security Tools
    'md5-hash',
    'sha256-hash',
    'sha512-hash',
    'crc32-hash',
    // Utilities
    'word-counter',
    'timestamp-converter',
    'lorem-ipsum',
    'regex-tester',
    'diff-checker',
    'url-parser',
    // Image Tools
    'image-converter',
    'image-compressor',
    'image-resizer',
    'format-converter',
    'bulk-processing',
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
    alternateRefs: [
      {
        href: `${baseUrl}/tools/${tool}`,
        hreflang: 'en',
      },
    ],
  }));

  return [...staticRoutes, ...toolRoutes];
}

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/api/',
          '/*?*', // Prevent crawling of search queries
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'], // Optional: Block AI crawlers if desired
      },
    ],
    sitemap: 'https://developer-tools-alpha.vercel.app/sitemap.xml',
    host: 'https://developer-tools-alpha.vercel.app',
  };
}

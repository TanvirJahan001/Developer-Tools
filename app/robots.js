export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://developer-tools-alpha.vercel.app/sitemap.xml', // Replace with your actual domain
  };
}
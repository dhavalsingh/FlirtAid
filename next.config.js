/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/flirtaid',
  assetPrefix: '/flirtaid/',
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/dhavalsingh',
        permanent: false,
      },
      {
        source: '/deploy',
        destination: 'https://vercel.com/templates/next.js/twitter-bio',
        permanent: false,
      },
    ];
  },
};

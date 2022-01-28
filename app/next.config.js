const withOptimizedImages = require('next-optimized-images');
const path = require('path')

module.exports =  withOptimizedImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['global-uploads.webflow.com']
  }
});

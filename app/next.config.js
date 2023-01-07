const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['global-uploads.webflow.com', 'avatars.githubusercontent.com', 'open.rocket.chat', 'media-exp1.licdn.com', 'user-images.githubusercontent.com']
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config
  }
}

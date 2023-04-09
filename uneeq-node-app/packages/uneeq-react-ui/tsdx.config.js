const images = require('@rollup/plugin-image')
const url = require('@rollup/plugin-url')
const svgr = require('@svgr/rollup').default

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url({ include: ['**/*.webm', '**/*.mp4', '**/*.mp3'] }),
      images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
      svgr(),
      ...config.plugins
    ]

    return config
  }
}

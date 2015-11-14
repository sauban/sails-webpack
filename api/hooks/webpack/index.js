import Marlinspike from 'marlinspike'
import webpack from 'webpack'

class Webpack extends Marlinspike {
  constructor (sails) {
    super(sails, module)
  }

  configure () {
    let config = this.sails.config

    if (!config.webpack.options) {
      sails.log.error('sails-webpack: no Webpack "options" are defined.')
      sails.log.error('sails-webpack: Please configure config/webpack.js')
      return sails.lower();
    }

    this.compiler = webpack(this.sails.config.webpack.options || { })
  }

  initialize (next) {
    let config = this.sails.config

    if (config.webpack.watch) {
      sails.log.debug('sails-webpack: watching...')
      this.compiler.watch(this.sails.config.webpack.watchOptions || { }, this.afterWatch)
      next()
    }
    else {
      sails.log.info('sails-webpack: running...')
      this.compiler.run(next)
    }
  }

  afterWatch (err, stats) {
    if (err) sails.log.warn('sails-webpack:', err)
    sails.log.debug('sails-webpack: done.')
    sails.log.silly('sails-webpack: stats:', stats)
  }
}

module.exports = Marlinspike.createSailsHook(Webpack)

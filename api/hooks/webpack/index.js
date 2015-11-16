import Marlinspike from 'marlinspike'
import webpack from 'webpack'
import _ from 'lodash'

class Webpack extends Marlinspike {
  constructor (sails) {
    super(sails, module)
  }

  configure () {
    let config = this.sails.config

    if (!config.webpack.options) {
      sails.log.warn('sails-webpack: no Webpack "options" are defined.')
      sails.log.warn('sails-webpack: Please configure config/webpack.js')
    }

    this.compiler = webpack(_.extend({ }, this.sails.config.webpack.options), function (err, stats) {
      if (err) throw err;

      sails.log.info('sails-webpack: compiler loaded.')
      sails.log.silly('sails-webpack: ', stats)
    })
  }

  initialize (next) {
    let config = this.sails.config

    if (process.env.NODE_ENV == 'development') {
      sails.log.info('sails-webpack: watching...')
      this.compiler.watch(_.extend({ }, this.sails.config.webpack.watchOptions), this.afterWatch)
      next()
    }
    else {
      sails.log.info('sails-webpack: running...')
      this.compiler.run(next)
    }
  }

  afterWatch (err, stats) {
    if (err) sails.log.warn('sails-webpack:', err)

    sails.log.info('sails-webpack: done.')
    sails.log.silly('sails-webpack: stats:', stats)
  }
}

module.exports = Marlinspike.createSailsHook(Webpack)

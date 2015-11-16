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
      this.compiler.watch(_.extend({ }, this.sails.config.webpack.watchOptions), this.afterBuild)
      next()
    }
    else {
      sails.log.info('sails-webpack: running...')
      this.compiler.run((err, stats) => {
        this.afterBuild(err, stats)
        next()
      })
    }
  }

  afterBuild (err, rawStats) {
    if (err) sails.log.error('sails-webpack: FATAL ERROR', err)

     let stats = rawStats.toJson()

     if (stats.errors.length > 0) {
       sails.log.warn('sails-webpack:', stats.errors)
     }
     if (stats.warnings.length > 0) {
       sails.log.info('sails-webpack:', stats.warnings)
     }

    sails.log.debug(rawStats.toString({
      colors: true,
      progress: true
    })
  }
}

module.exports = Marlinspike.createSailsHook(Webpack)

import Marlinspike from 'marlinspike'
import webpack from 'webpack'

class Webpack extends Marlinspike {
  constructor (sails) {
    super(sails, module)
  }

  configure () {
    this.compiler = webpack(this.sails.config.webpack.options)
  }

  initialize (next) {
    let config = this.sails.config

    if (config.webpack.watch) {
      sails.log.info('sails-webpack: watching...')
      this.compiler.watch(this.sails.config.webpack.watchConfig, this.afterWatch)
      next()
    }
    else {
      this.compiler.run(next)
    }
  }

  afterWatch (err, stats) {

  }
}

module.exports = Marlinspike.createSailsHook(Webpack)

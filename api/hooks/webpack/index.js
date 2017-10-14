import Marlinspike from 'marlinspike'
import webpack from 'webpack'
import _ from 'lodash'

class Webpack extends Marlinspike {
    constructor(sails) {
        super(sails, module)
    }

    configure() {
        let config = this.sails.config

        if (!config.webpack.options) {
            sails.log.warn('sails-webpack: no Webpack "options" are defined.')
            sails.log.warn('sails-webpack: Please configure config/webpack.js')
        }
    }

    initialize(next) {
        let webpackConfig = this.sails.config.webpack
        let devServer = this.sails.config.webpack.development;
        next()

        sails.after('lifted', () => {
            this.compiler = webpack(_.extend({}, webpackConfig.options), (err, stats) => {
                if (err) throw err;

                sails.log.info('sails-webpack: compiler loaded.')
                sails.log.silly('sails-webpack: ', stats.toString())

                if (process.env.NODE_ENV == 'development') {
                    sails.log.info('sails-webpack: watching...')
                    this.compiler.watch(_.extend({}, webpackConfig.watchOptions), this.afterBuild)
                } else {
                    sails.log.info('sails-webpack: running...')
                    this.compiler.run(this.afterBuild)
                }

                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' && devServer /*config.server*/ ) {
                    const WebpackDevServer = require('webpack-dev-server');
                    const defaultDevServerConfig = {
                        hot: true,
                        port: 3000
                    };

                    // merge defaults
                    devServer.config = _.extend(defaultDevServerConfig, devServer.config || {});

                    if (devServer.webpack) {
                        this.devServerCompiler = webpack(devServer.webpack);
                    }

                    this.devServer = new WebpackDevServer(
                        this.devServerCompiler || this.compiler,
                        devServer.config
                    );

                    this.devServer.listen(devServer.config.port);
                }
            })
        })
    }

    afterBuild(err, rawStats) {
        if (err) return sails.log.error('sails-webpack: FATAL ERROR', err)

        let stats = rawStats.toJson()

        sails.log.debug('sails-webpack: Build Info\n' + rawStats.toString({
            colors: true,
            chunks: false
        }))

        if (stats.errors.length > 0) {
            sails.log.error('sails-webpack:', stats.errors)
        }
        if (stats.warnings.length > 0) {
            sails.log.warn('sails-webpack:', stats.warnings)
        }
    }
}

module.exports = Marlinspike.createSailsHook(Webpack)
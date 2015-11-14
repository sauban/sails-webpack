# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' />-webpack

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Webpack asset pipeline hook for Sails.

## 1. Install
```sh
$ npm install sails-webpack --save
```

## 2. Configure

### a. Disable the built-in Grunt hook

```js
// .sailsrc
{
  "hooks": {
    "grunt": false
  }
}
```

### b. Set your environment.

By default, Sails ([and express](http://stackoverflow.com/a/16979503/291180) sets `NODE_ENV=development`.
In this setting, webpack will watch for changes in the directories you specify in your `config/webpack.js`.


| `NODE_ENV` | webpack mode | description |
|:---|:---|:---|
| `development` | [`webpack.watch()`](https://webpack.github.io/docs/configuration.html#watch) | Rebuilds on file changes during runtime |
| `staging` or `production` | `webpack.run()` | Build bundle once on load. |

### c. Configure Webpack

This hook uses standard [Webpack Configuration](https://webpack.github.io/docs/configuration.html).
Below is an example of using webpack to compile a [React.js](https://facebook.github.io/react/) application located in `assets/js/`.

```js
// config/webpack.js

var webpack = require('webpack');

// compile js assets into a single bundle file
module.exports.webpack = {
  options: {
    devtool: 'eval',
    entry: [
      './assets/js',
    ],
    output: {
      path: path.resolve(__dirname, '.tmp/public/js'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        { test: /\.js$/, loaders: ['babel-loader?stage=0'], include: path.resolve(__dirname, 'src') },
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
  },

  // docs: https://webpack.github.io/docs/node.js-api.html#compiler
  watchOptions: {
    aggregateTimeout: 300
  }
};
```

## 3. Lift!

```sh
$ sails lift
```

## License
MIT

## Maintained By
[<img src='http://i.imgur.com/zM0ynQk.jpg' height='36px'>](http://balderdash.io)
- [Joey Di Nardo](https://github.com/yejodido)
- [Weyland Joyner](https://github.com/weyj4)
- [Travis Webb](https://github.com/tjwebb)

<img src='http://i.imgur.com/NsAdNdJ.png'>

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/sails-webpack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sails-webpack
[travis-image]: https://img.shields.io/travis/balderdash-projects/sails-webpack.svg?style=flat-square
[travis-url]: https://travis-ci.org/balderdash-projects/sails-webpack
[daviddm-image]: http://img.shields.io/david/balderdash-projects/sails-webpack.svg?style=flat-square
[daviddm-url]: https://david-dm.org/balderdash-projects/sails-webpack

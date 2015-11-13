# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' />-webpack

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Webpack asset pipeline hook for Sails.

## 1. Install
```sh
$ npm install sails-webpack --save
```

## 2. Configure

### 2a. Disable the built-in Grunt hook

```js
// .sailsrc
{
  "hooks": {
    "grunt": false
  }
}
```

### 2b. Configure Webpack

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
        { test: /\.js$/, loaders: ['babel-loader?stage=0'], include: path.resolve(__dirname, 'src') },
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
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

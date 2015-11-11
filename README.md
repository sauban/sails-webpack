# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' />-permissions

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Comprehensive sails.js user permissions and entitlements system. Supports user authentication with passport.js, role-based permissioning, object ownership, and row-level security.

## Install
```sh
$ npm install sails-webpack --save
```

## Configure
Place your usual webpack config inside `config/webpack.js`

```js
var webpack = require('webpack');

// compile assets into a single bundle file
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

## License
MIT

## Maintained By
[<img src='http://i.imgur.com/zM0ynQk.jpg' height='36px'>](http://balderdash.io)
- [Joey Di Nardo](https://github.com/yejodido)
- [Weyland Joyner](https://github.com/weyj4)

<img src='http://i.imgur.com/NsAdNdJ.png'>

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/sails-permissions.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sails-permissions
[travis-image]: https://img.shields.io/travis/tjwebb/sails-permissions.svg?style=flat-square
[travis-url]: https://travis-ci.org/tjwebb/sails-permissions
[daviddm-image]: http://img.shields.io/david/tjwebb/sails-permissions.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tjwebb/sails-permissions
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/tjwebb/sails-permissions

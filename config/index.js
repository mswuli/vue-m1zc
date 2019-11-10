'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
		// '/api':{  //配置的路径是/api
		//   target:'http://localhost:8080',  //路径目标，也就是请求路径时
		// 	changeOrigin: true,  //打开跨域请求
		//   pathRewrite:{  //路径重写，配置路径代理
		//     '^/api':'/static/mock'  //将/api 映射成/static/mock
		//   }
		// },
		'/index':{
			target:'https://m.1zhanche.com',
			changeOrigin: true,
			pathRewrite:{
				'^/index':'/index'
			}
		},
		'/v3':{
			target:'https://restapi.amap.com',
			changeOrigin: true,
			pathRewrite:{
				'^/v3':'/v3'
			}
		},
		'/oauth2.0':{
			target:'https://graph.qq.com',
			changeOrigin: true,
			pathRewrite:{
				'/oauth2.0':'/oauth2.0'
			}
		},
		'/cgi-bin':{
			target:'https://api.weixin.qq.com',
			changeOrigin: true,
			pathRewrite:{
				'/cgi-bin':'/cgi-bin'
			}
		},
	},

    // Various Dev Server settings
    // host: 'yang.com', // can be overwritten by process.env.HOST
    host:"localhost",
	port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

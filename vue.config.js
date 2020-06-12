// vue.config.js
const path = require('path')
// port = 8888 npm run dev OR npm run dev --port = 8888
const port = process.env.port || process.env.npm_config_port || 8000
const name = '班桥'
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/classcommunity/', // 本地默认就是'/',实际应用是被部署在一个域名的根路径上classcommunity
  outputDir: 'dist', // 默认为dist
  assetsDir: 'static', // 默认为''
  lintOnSave: process.env.NODE_ENV !== 'production', // 每次保存时 lint 代码
  productionSourceMap: false, // 不需要生产环境的 source map
  devServer: {
    port,
    open: true, // 自动打开浏览器
    overlay: {
      errors: true, // 当编译错误时在浏览器全屏显示
      warnings: false
    },
    proxy: { // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      [process.env.VUE_APP_BASE_API]: { // Proxy /api requests to 当前前端项目路径http://localhost:8081/api
        target: process.env.VUE_APP_BASE_API_URL, // (没有匹配到静态文件的请求) 代理到http://localhost:3000（真实后台路径）
        changeOrigin: true, // 为false则request host 为localhost；设置为true,target是host
        pathRewrite: {
          '^/api': '/api' // 真实后台接口需要带 /api
        }
      }/* ,
      '/socket': { // 设置websocket代理
        target: process.env.VUE_APP_BASE_SOCKET_URL,
        ws: true, // 开启websocket代理  注意
        changeOrigin: true,
        pathRewrite: {
          '^/socket': ''
        }
      } */
    }
  },
  configureWebpack: { // https://cli.vuejs.org/zh/config/#configurewebpack
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src') // Create aliases to import or require certain modules more easily.
      }
    }
  },
  chainWebpack (config) { // https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
    config.plugins.delete('preload')// 指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload
    config.plugins.delete('prefech') // 告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true // 去掉元素的空格 https://vue-loader.vuejs.org/zh/options.html#compiler
        return options
      })
      .end()

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development', config => {
        config.devtool('cheap-source-map') // https://webpack.js.org/configuration/devtool/#special-cases
      })

    config
      .when(process.env.NODE_ENV !== 'development', config => {
        // 添加async，defer或module属性的<script>元素，甚至他们内联
        config.plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()

        config
          .optimization.splitChunks({ // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent 只打包初始时依赖的第三方
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 2, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
        config.optimization.runtimeChunk('single') // he value 'single' instead creates a runtime file to be shared for all generated chunks
      })
  }
}

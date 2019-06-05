const axios = require('axios');


module.exports = {
  /*
  ** Headers of the page
  */
  //loading:'~/components/loading.vue',
  loading:{color:'rgb(24,144,255)'},
  generate: {
    routes: function () {

      return axios.get('http://localhost/smarty/blog/index.php?a=ajax&m=getContentListId')
          .then((res) => {
            return res.data.map((details) => {
              return {
                route:details.url,
                payload:details
              }
            })
          })
    }

  },
  rules:[{
      test:/\.(ttf|eot|woff|woff2|svg)/,
      use:['file-loader']
  }],

  head: {
    title: '幸运码',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css:['~/assets/css/basic.css', 'element-ui/lib/theme-chalk/index.css'],

  router: {
    middleware:[ 'visitCount']
  },

  /*
  ** Customize the progress bar color
  */

  /*
  ** Build configuration
  */
  build: {
    //vendor:['external_library'],
    /*
    ** Run ESLint on save
    */
    //babel: {
    //  'plugins': [['component', [
    //    {
    //      'libraryName': 'element-ui',
    //      'styleLibraryName': 'theme-default'
    //    },
    //    'transform-async-to-generator',
    //    'transform-runtime'
    //  ]]],
    //  comments: true
    //},
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extend(config, { isDev, isClient }) {
      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
      vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';
    }
  //
  }

  //plugins: [{
  //  src: '~plugins/ElementUI',
  //  ssr: true,
  //}]

}


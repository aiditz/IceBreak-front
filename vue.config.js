module.exports = {
  configureWebpack: {
  },

  devServer: {
    disableHostCheck: true
  },

/*  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/
      ],
    },
    themeColor: '#1da025'
  },*/
};

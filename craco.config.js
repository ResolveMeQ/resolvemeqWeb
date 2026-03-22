module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        {
          module: /@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
      ];

      const eslintPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor?.name === "ESLintWebpackPlugin"
      );
      if (eslintPlugin?.options) {
        eslintPlugin.options.cache = false;
      }

      return webpackConfig;
    },
  },
};

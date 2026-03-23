const path = require("path");

module.exports = {
  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        ...(jestConfig.moduleNameMapper || {}),
        "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/dist/index.js",
        "^react-router$": "<rootDir>/node_modules/react-router/dist/development/index.js",
        "^react-router/dom$": "<rootDir>/node_modules/react-router/dist/development/dom-export.js",
      };
      return jestConfig;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias || {}),
        three: path.resolve(__dirname, "node_modules/three"),
      };

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

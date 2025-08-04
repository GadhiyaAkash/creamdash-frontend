module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find and configure sass-loader to suppress warnings
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      if (oneOfRule) {
        oneOfRule.oneOf.forEach(rule => {
          if (rule.test && rule.test.toString().includes('scss|sass')) {
            if (rule.use) {
              rule.use.forEach(useItem => {
                if (typeof useItem === 'object' && useItem.loader && useItem.loader.includes('sass-loader')) {
                  useItem.options = {
                    ...useItem.options,
                    sassOptions: {
                      ...useItem.options?.sassOptions,
                      quietDeps: true,
                      logger: {
                        warn: function(message) {
                          // Suppress specific deprecation warnings
                          const suppressedWarnings = [
                            'legacy-js-api',
                            '@import',
                            'deprecated',
                            'color.mix',
                            'math.unit',
                            'red()',
                            'green()',
                            'blue()'
                          ];
                          const shouldSuppress = suppressedWarnings.some(warning => 
                            message.includes(warning)
                          );
                          if (!shouldSuppress) {
                            console.warn(message);
                          }
                        }
                      }
                    }
                  };
                }
              });
            }
          }
        });
      }
      return webpackConfig;
    }
  }
};

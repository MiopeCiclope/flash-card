module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false, // Set to true if you want to fail on missing variables
          allowUndefined: true, // Allow undefined variables
        },
      ],
    ],
  };
};

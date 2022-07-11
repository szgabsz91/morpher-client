const path = require('path');

const extraNodeModules = {
  '@szg/morpher-client-shared': path.resolve(__dirname, '..', 'shared'),
};

const watchFolders = [
  path.resolve(__dirname, '..', 'shared')
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules
  },
  watchFolders
};

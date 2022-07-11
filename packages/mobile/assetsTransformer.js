const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    console.log('Filename', filename);
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};

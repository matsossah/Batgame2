const path = require('path');

function getRoots() {
  return [
    __dirname,
    path.resolve(__dirname, '../node_modules/lodash'),
    path.resolve(__dirname, '../shared'),
  ];
}

const config = {
  getProjectRoots() {
    return getRoots();
  },

  getAssetRoots() {
    return getRoots();
  },
};

module.exports = config;

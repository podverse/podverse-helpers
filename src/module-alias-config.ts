const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '@helpers': path.join(__dirname, '')
});

export {};
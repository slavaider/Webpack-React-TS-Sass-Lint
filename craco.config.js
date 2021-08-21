const path = require("path");
const base = require('./tsconfig.paths.json');
const {compilerOptions: {paths}} = base;

function parseString(stringToParse) {
  const regex = new RegExp('^([a-z\\/@]+)(\\/\\*)+$');
  return stringToParse.match(regex)[1];
}

function getPaths(paths) {
  const result = {}
  const firstElement = 0;
  const resolvePath = pathName => path.resolve(__dirname, pathName)
  Object.keys(paths).forEach(key => {
    result[parseString(key)] = resolvePath(parseString(paths[key][firstElement]))
  })
  return result
}

module.exports = {
  webpack: {
    alias: getPaths(paths)
  },
};

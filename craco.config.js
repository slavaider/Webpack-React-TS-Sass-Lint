const path = require("path");
const base = require("./tsconfig.paths.json");

function parseString(stringToParse) {
  const regex = new RegExp("^([a-z\\/@]+)(\\/\\*)+$");
  return stringToParse.match(regex)[1];
}

function getPaths() {
  const {
    compilerOptions: { paths },
  } = base;
  const resolvePath = (pathName) => path.resolve(__dirname, pathName);
  return Object.keys(paths).reduce((result, key) => {
    result[parseString(key)] = resolvePath(parseString(paths[key][0]));
    return result;
  }, {});
}

module.exports = {
  webpack: {
    alias: getPaths(),
  },
};

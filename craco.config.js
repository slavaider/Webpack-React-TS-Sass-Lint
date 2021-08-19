const path = require("path");
const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@ui': resolvePath('./src/ui'),
      '@shared': resolvePath('./src/shared'),
      '@store': resolvePath('./src/store'),
      '@interfaces': resolvePath('./src/interfaces'),
      '@root': resolvePath('./src/root')
    }
  },
};

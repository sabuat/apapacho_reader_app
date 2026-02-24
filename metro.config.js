const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  'react-native-css-interop': path.resolve(__dirname, 'react-native-css-interop'),
};

module.exports = withNativeWind(config, {
  input: './global.css',
  forceWriteFileSystem: true,
});

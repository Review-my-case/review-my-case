const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Firebase's JS SDK uses "package exports" for file resolution, which Metro
// (Expo's bundler) does not fully support by default. Disabling this specific
// setting is the standard, documented fix for Expo + Firebase projects.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

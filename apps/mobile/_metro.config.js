// @ts-check

// // Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require('path');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname, {
//   // [Web-only]: Enables CSS support in Metro.
//   isCSSEnabled: true,
// });
//
// module.exports = config;

const ROOTS = {
  // Find the project and workspace directories
  project: __dirname,
  // This can be replaced with `find-yarn-workspace-root`
  workspace: path.resolve(__dirname, '../'),
};



module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };


  // 1. Watch all files within the monorepo
  // config.watchFolders = [workspaceRoot];
  config.watchFolders = [ROOTS.project];
  // 2. Let Metro know where to resolve packages and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(ROOTS.project, 'node_modules'),
    path.resolve(ROOTS.workspace, 'node_modules'),
  ];
  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;

  return config;
})();

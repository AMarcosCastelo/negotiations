module.exports = (api) => {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = ['transform-es2015-modules-systemjs'];
  return {
    presets,
    plugins
  };
};

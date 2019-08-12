module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', {
      modules: false,
      targets: { node: 'current' },
      debug: true,
    }],
    '@babel/preset-typescript',
  ];

  const plugins = [
  ];

  return {
    presets,
    plugins,
  }
}

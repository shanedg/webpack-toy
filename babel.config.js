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

  if (api.env('test')) {
    plugins.push(
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-class-properties',
    );
  }

  return {
    presets,
    plugins,
  }
}

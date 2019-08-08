module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['env', {
      modules: false,
      targets: { node: 'current' },
      debug: true,
    }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    // '@babel/plugin-proposal-export-default-from',
  ];

  if (api.env('test')) {
    plugins.push(
      'transform-es2015-modules-commonjs',
      // '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
    );
  }

  return {
    presets,
    plugins,
  }
}

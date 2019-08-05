class MyCustomWebpackPlugin {
  apply(compiler) {
    console.info('MyCustomWebpackPlugin::hooks', Object.keys(compiler.hooks));

    compiler.hooks.done.tap('MyCustomWebpackPlugin', (stats) => {
      console.info('\nMyCustomWebpackPlugin::stats', Object.keys(stats));
    });
  }
}

module.exports = MyCustomWebpackPlugin;

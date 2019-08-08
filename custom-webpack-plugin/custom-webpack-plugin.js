/**
 * A toy custom webpack plugin
 */
class MyCustomWebpackPlugin {
  apply(compiler) {

    // available compiler hooks include:
    //   [
    //     'shouldEmit',
    //     'done',
    //     'additionalPass',
    //     'beforeRun',
    //     'run',
    //     'emit',
    //     'afterEmit',
    //     'thisCompilation',
    //     'compilation',
    //     'normalModuleFactory',
    //     'contextModuleFactory',
    //     'beforeCompile',
    //     'compile',
    //     'make',
    //     'afterCompile',
    //     'watchRun',
    //     'failed',
    //     'invalid',
    //     'watchClose',
    //     'environment',
    //     'afterEnvironment',
    //     'afterPlugins',
    //     'afterResolvers',
    //     'entryOption',
    //  ]

    // compiler.plugin('emit', (compilation, cb) => {
    //   console.log(compilation);
    //   cb();
    // });
    console.log(Object.keys(compiler));

    compiler.hooks.compilation.tap('MyCustomWebpackPlugin', (compilation, compilationParams) => {
      // asdf
    });

    compiler.hooks.done.tap('MyCustomWebpackPlugin', (stats) => {
      // console.info('\tBuild started', new Date(stats.startTime).toLocaleTimeString());
      // console.info('\tBuild completed', new Date(stats.endTime).toLocaleTimeString());
      // console.info('\tBuild duration', stats.endTime - stats.startTime, 'ms');
    });
  }
}

module.exports = MyCustomWebpackPlugin;

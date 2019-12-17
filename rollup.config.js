const typescript = require('rollup-plugin-typescript2');
const path = require('path');

const pkg = require('./package.json');

const deps = [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})];

const external = id => deps.includes(id) || /@babel\/runtime\//.test(id);

const tsConfigPath = path.join(__dirname, 'tsconfig.json');

const getBasicConf = () => ({
  input: path.join(__dirname, 'src', 'index.ts'),
  external,
});

const getCJSConf = () => ({
  ...getBasicConf(),
  output: { file: pkg.main, format: 'cjs' },
  plugins: [
    typescript({
      tsconfig: tsConfigPath,
      tsconfigOverride: {
        compilerOptions: {
          // module: 'CommonJS',
          target: 'es3',
        },
      },
    }),
  ],
});

const getEJSConf = () => ({
  ...getBasicConf(),
  output: { file: pkg.module, format: 'es' },
  plugins: [
    typescript({
      tsconfig: tsConfigPath,
      tsconfigOverride: {
        compilerOptions: {
          // module: 'es2015',
          target: 'es2019',
          declaration: false,
        },
      },
    }),
  ],
});

module.exports = [getCJSConf(), getEJSConf()];

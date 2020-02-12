import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
// import svg from 'rollup-plugin-svg';

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    { file: `dist/${pkg.name}.js`, format: 'cjs', sourcemap: true },
    { file: `dist/${pkg.name}.es.js`, format: 'es', sourcemap: true }
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      sourceMap: 'inline',
      extract: `dist/${pkg.name}.css`,
    }),
    external(),
    url(),
    svgr(),
    babel(),
    resolve(),
    commonjs({
      namedExports: {
        'esrever': ['reverse']
      }
    }),
  ]
}

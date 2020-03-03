import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import syncToExample from './syncToExample';
// import svg from 'rollup-plugin-svg';

export default {
  input: 'src/index.js',
  output: [
    { file: `dist/mms-editor.js`, format: 'cjs', sourcemap: true },
    { file: `dist/mms-editor.es.js`, format: 'es', sourcemap: true }
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      sourceMap: false,
      extract: `dist/mms-editor.css`,
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
    syncToExample()
  ]
}

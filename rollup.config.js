import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'

import pkg from './package.json'

const umdGlobals = {
  react: 'React',
  'react-animated-cursor': 'AnimatedCursor'
}

const getBabelOptions = () => ({
  exclude: '**/node_modules/**'
})

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.pkg_cjs,
      format: 'cjs'
    },
    {
      file: pkg.pkg_module,
      format: 'es'
    },
    {
      file: pkg.pkg_browser,
      format: 'umd',
      name: 'AnimatedCursor',
      globals: umdGlobals
    }
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
}

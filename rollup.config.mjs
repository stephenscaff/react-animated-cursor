import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

const umdGlobals = {
  react: 'React',
  'react-animated-cursor': 'AnimatedCursor',
  'react/jsx-runtime': 'jsxRuntime'
}

const config = [
  {
    external: ['react', 'react-dom'],
    input: 'lib/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner: "'use client';"
      },
      {
        file: pkg.module,
        format: 'esm',
        banner: "'use client';"
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'AnimatedCursor',
        globals: umdGlobals,
        banner: "'use client';"
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        exclude: 'node_modules'
      })
    ]
  },
  {
    external: ['react', 'react-dom'],
    input: 'lib/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [external(), resolve(), dts()]
  }
]

export default config

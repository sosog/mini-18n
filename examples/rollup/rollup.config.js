import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        !production && serve({
            open: true,
            contentBase: ['dist', '.'],
            port: 3000
        }),
        !production && livereload('dist')
    ]
};

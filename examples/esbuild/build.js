import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    sourcemap: true,
    format: 'iife',
});

if (isWatch) {
    await ctx.watch();
    console.log('Watching for changes...');

    // Simple dev server
    await ctx.serve({
        servedir: '.',
        port: 4000,
    });
    console.log('Server running at http://localhost:4000/');
} else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('Build complete!');
}

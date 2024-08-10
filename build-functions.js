import { build } from 'esbuild';
import { glob } from 'glob';

// Find the index.js file
const entryPoint = glob.sync('src-index.js')[0];
build({
    entryPoints: [entryPoint],
    outfile: 'index.js',
    bundle: true,
    platform: 'browser',
    target: 'esnext',
    format: 'iife',
    define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'window'
    },
    plugins: [
        // List your plugins here if you need browser shims for Node.js modules
    ]
}).then(() => {
    console.log('Functions built successfully.');
}).catch((error) => {
    console.error('Error building functions:', error);
    process.exit(1);
});
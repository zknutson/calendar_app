const esbuild = require('esbuild');
const glob = require('glob');

// Find all function files
const entryPoints = glob.sync('netlify/functions/**/*.js');

esbuild.build({
    entryPoints,
    outdir: 'netlify/functions-build',
    bundle: true,
    platform: 'node',
    target: 'node18', // specify the Node.js version target
    format: 'cjs',
}).then(() => {
    console.log('Functions built successfully.');
}).catch((error) => {
    console.error('Error building functions:', error);
    process.exit(1);
});
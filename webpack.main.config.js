const nodeExternals = require('webpack-node-externals');

console.log(require('node:v8').getHeapStatistics().total_available_size/1024/1024, __filename );

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */

	entry: './src/main.js',
	externals: [nodeExternals({
		importType: 'commonjs'
	})],
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules'),
	},
	plugins: [
	]
};

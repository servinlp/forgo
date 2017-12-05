const path = require( 'path' ),
	webpack = require( 'webpack' ),
	UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' ),
	nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
	entry:  {
		filename: './src/js/index.js'
	},
	output: {
		filename: 'script.js',
		path:	 path.resolve( __dirname, 'build/js' )
	},
	devtool: 'source-map',
	module:  {
		loaders: [
			{
				test:	/\.js$/,
				exclude: /node_modules/,
				loader:  'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
    devServer: {
        contentBase: path.join( __dirname, 'build' ),
        // compress: true,
        port: 8000
    },
	plugins: [
		new UglifyJSPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify( nodeEnv ) }
		})
	]
}

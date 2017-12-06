const path = require( 'path' ),
	webpack = require( 'webpack' ),
	UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' ),
    ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
    SassPlugin = require( 'sass-webpack-plugin' ),
    HtmlPlugin = require( 'html-webpack-plugin' ),
	nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
	entry:  {
		filename: './src/js/index.js'
	},
	output: {
		filename: 'script.js',
		path:     path.resolve( __dirname, 'build/js' )
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
			},
            {
                test: /\.scss$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            // }
		],
        // rules: [{
        //     test: /\.scss$/,
        //     use: [{
        //         loader: "style-loader"
        //     }, {
        //         loader: "css-loader",
        //         options: {
        //             sourceMap: true
        //         }
        //     }, {
        //         loader: "sass-loader",
        //         options: {
        //             sourceMap: true
        //         }
        //     }]
        // }]
        // rules: [{
        //   test: /\.module\.s[ac]ss$/,
        //   use: [{
        //     loader: 'style-loader',
        //     options: { sourceMap: true }
        //   }, {
        //     loader: 'css-loader',
        //     options: {
        //       localIdentName: '[sha512:hash:base32]-[name]-[local]',
        //       modules: true,
        //       sourceMap: true
        //     }
        //   }, {
        //     loader: 'postcss-loader',
        //     options: { sourceMap: true }
        //   }, {
        //     loader: 'sass-loader',
        //     options: {
        //       // includePaths: modulePaths,
        //       sourceMap: true
        //     }
        //   }]
        // }]
	},
    watch: true,
    devServer: {
        // contentBase: path.join( __dirname, 'build' ),
        // // compress: true,
        port: 8000,
        inline: true
    },
    plugins: [
      new SassPlugin( './src/css/index.scss' ),
      new HtmlPlugin( {
        inject: false,
        template: require( 'html-webpack-template' ),
        title: 'Sass webpack plugin',
        // filename: 'index.html',
        // template: 'src/html/index.html',
        links: [{ rel: 'stylesheet', type: 'text/css', href: '/index.css' }],
        appMountId: 'app'
      } )
    ]
	// plugins: [
    //     new ExtractTextPlugin("[name].css")
    // ]
	// 	new UglifyJSPlugin({
	// 		compress: {
	// 			warnings: false
	// 		},
	// 		output: {
	// 			comments: false
	// 		},
	// 		sourceMap: true
	// 	}),
	// 	new webpack.DefinePlugin({
	// 		'process.env': { NODE_ENV: JSON.stringify( nodeEnv ) }
	// 	})
	// ]
}

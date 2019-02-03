const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Геренерит HTML под это дело
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Собирает css по всему проекту
const Dotenv = require('dotenv-webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Сжимает CSS
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("@babel/polyfill");

module.exports = env => {
	console.log('[WEBPACK] Идет процесс сборки статики');
	return {
		entry: ['@babel/polyfill', './src/index.js'],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'my-first-webpack.bundle.js'
		},
		module: {
			rules: [
				// {
				// 	test: /\.css/,
				// 	include: ['/node_modules/'],
				// 	use: [
				// 		 MiniCssExtractPlugin.loader,
				// 		'css-loader',
				// 	],
				// },
				{
					test: /\.css/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
					],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: '.',
								name: '[path][name].[ext]'
							}
						}
					]
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
			]
		},
		resolve: {
			extensions: ['*', '.js', '.jsx']
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
				//minify: true,
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
			// new OptimizeCssAssetsPlugin({
			// 	assetNameRegExp: /\.optimize\.css$/g,
			// 	cssProcessor: require('cssnano'),
			// 	cssProcessorPluginOptions: {
			// 		preset: ['default', {discardComments: {removeAll: true}}],
			// 	},
			// 	canPrint: true
			// }),
			new CopyWebpackPlugin([
				{from: './public', to: '.'}
			]),
			new Dotenv({
				path: '.env.production'
			}),
		],
	}
};
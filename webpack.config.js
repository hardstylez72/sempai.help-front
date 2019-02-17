const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Геренерит HTML под это дело
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Собирает css по всему проекту
const Dotenv = require('dotenv-webpack');
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
				template: './public/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
			new CopyWebpackPlugin([
				{from: './public', to: '.'}
			]),
			new Dotenv({
				path: '.env.production'
			}),
		],
	}
};
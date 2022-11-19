import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    rules: [
      { test: /\.ts?$/, exclude: /node_modules/, use: ['ts-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

export default config;

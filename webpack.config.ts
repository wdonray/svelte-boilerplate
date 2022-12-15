import { Configuration, RuleSetRule } from 'webpack';
import { WebpackSetupConfig } from '@models/webpack';
import Autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import SveltePreprocess from 'svelte-preprocess';

const setupConfig = ({ 
  isDevelopment,
  isProduction, 
}: WebpackSetupConfig) => {
  const alias = {
    svelte: path.resolve('node_modules', 'svelte'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@stores': path.resolve(__dirname, './src/store'),
  };

  const output: Configuration['output'] = {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  };

  const plugins: Configuration['plugins'] = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      title: 'svelte-boilerplate'
    }),
  ];

  const sassLoader: RuleSetRule = { 
    test: /\.s[ac]ss$/i, 
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [Autoprefixer]
          }
        }
      },
      'sass-loader'
    ] 
  };

  const tsLoader: RuleSetRule =  { 
    test: /\.ts?$/, 
    exclude: /node_modules/, 
    use: 'ts-loader',
  };

  const svelteLoader: RuleSetRule = { 
    test: /\.svelte$/, 
    use: {
      loader: 'svelte-loader',
      options: {
        compilerOptions: {
          // Dev mode must be enabled for HMR to work!
          dev: isDevelopment
        },
        emitCss: isProduction,
        hotReload: isDevelopment,
        hotOptions: {
          // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
          noPreserveState: false,
          optimistic: true,
        },
        preprocess: SveltePreprocess({
          scss: true,
          sass: true,
          postcss: {
            plugins: [Autoprefixer]
          }
        }),
      },
    },
  };

  const fileLoader: RuleSetRule = {
    test: /\.(png|jpe?g|svg)$/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const module: Configuration['module'] = { 
    rules: [tsLoader, sassLoader, svelteLoader, fileLoader] 
  };

  const resolve: Configuration['resolve'] = {
    alias,
    extensions: ['.ts', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  };

  return <Configuration> {
    devServer: { hot: true },
    devtool: isProduction ? false : 'eval-source-map',
    entry: './src/main.ts',
    mode: isProduction ? 'production' : 'development',
    module,
    output,
    plugins,
    resolve,
    target: isDevelopment ? 'web' : 'browserslist',
  };  
};

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;


export default setupConfig({ 
  isDevelopment,
  isProduction,
});

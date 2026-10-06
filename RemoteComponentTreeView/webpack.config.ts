import 'dotenv/config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
// @ts-ignore TODO: Актуализировать плагин для работы с typescript.
import SungeroRemoteComponentMetadataPlugin from '@directum/sungero-remote-component-metadata-plugin';
import { dependencies } from './package.json';
import manifest from './component.manifest';
import { Configuration, container } from 'webpack';
import path from 'path';

const configure = (env: any, argv: any): Configuration => {
  const devMode = argv.mode === 'development';
  const standaloneMode = env.mode === 'standalone';

  const generateMetadataPlugin = new SungeroRemoteComponentMetadataPlugin(manifest);
  const publicName = generateMetadataPlugin.getPublicName();

  return {
    entry: {
      index: './index.js',
      [publicName]: './public-path.js',
    },
    devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
    output: {
      path:
        !standaloneMode &&
        devMode &&
        process.env.SUNGERO_DEPLOY_BASE &&
        process.env.SUNGERO_SOLUTION_NAME &&
        process.env.SUNGERO_COMPONENT_NAME
          ? path.resolve(
              process.env.SUNGERO_DEPLOY_BASE,
              `${process.env.SUNGERO_SOLUTION_NAME}.Components`,
              process.env.SUNGERO_COMPONENT_NAME
            )
          : undefined,
      publicPath: '',
      clean: true,
      filename: devMode
        ? `[name]_${manifest.componentVersion}.js`
        : `[name]_${manifest.componentVersion}_[chunkhash:8].js`,
      chunkFilename: devMode
        ? `chunks/[name]_${manifest.componentVersion}_[contenthash:8].js`
        : `chunks/[name]_${manifest.componentVersion}_[chunkhash:8].js`,
    },
    resolve: {
      modules: ['etc', 'src', 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            { loader: standaloneMode ? 'style-loader' : MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: devMode ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                  namedExport: false,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            { loader: standaloneMode ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
          ],
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: () => `images/[name]_${manifest.componentVersion}.[ext]`,
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            mangle: true,
            format: {
              comments: false,
            },
          },
          exclude: [/\.min\.js$/gi],
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                colormin: false,
              },
            ],
          },
        }),
      ],
    },
    plugins: standaloneMode
      ? [new HtmlWebpackPlugin({ template: './index.html' })]
      : [
          new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            insert: (linkTag: HTMLLinkElement) => document.head.prepend(linkTag),
          }),
          new container.ModuleFederationPlugin({
            name: publicName,
            filename: 'remoteEntry.js',
            exposes: {
              loaders: './component.loaders.ts',
              publicPath: './public-path.js',
            },
            shared: {
              react: {
                requiredVersion: dependencies.react,
              },
              'react-dom': {
                requiredVersion: dependencies['react-dom'],
              },
              i18next: {
                eager: false,
                requiredVersion: dependencies.i18next,
              },
              'react-error-boundary': {
                eager: false
              },
            },
          }),
          generateMetadataPlugin,
        ],
  };
};

export default configure;

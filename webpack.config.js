const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
   entry: './src/index.tsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
   },
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: ['file-loader'],
         },
         {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
         filename: './index.html',
         inject: 'body',
      }),
   ],
}

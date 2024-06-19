const path = require('path');

module.exports = {
  entry: './src/app/app.ts', // Entry point to your TypeScript file
  output: {
    filename: 'app-package.js', // Output bundle file
    path: path.resolve(__dirname, 'docs/rsrc/app')
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};

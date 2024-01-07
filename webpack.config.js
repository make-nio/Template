const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Modo de Webpack, puede ser 'development' o 'production'.
  mode: 'development',

  // Punto de entrada de tu aplicación.
  entry: './src/public/js/main.ts', // Asegúrate de que esta es la ruta correcta a tu archivo main.ts

  // Configuración de cómo manejar los archivos TypeScript y CSS.
  module: {
    rules: [
      {
        // Aplicar ts-loader a archivos .ts y .tsx
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Aplicar MiniCssExtractPlugin.loader y css-loader a archivos .css
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  // Configurar las extensiones que se resolverán automáticamente.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // Configuración del archivo de salida y los plugins.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'), 
  },

  // Agregar MiniCssExtractPlugin a la matriz de plugins.
  plugins: [
    new MiniCssExtractPlugin({
      // Opciones para el archivo de salida del CSS.
      filename: '../css/[name].css',
    }),
  ],

  // Opciones adicionales, como mapas de origen para la depuración.
  devtool: 'inline-source-map',
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: {
       "bundle": ["./src/index.tsx"],
      //  "main" : ["./main.tsx"],
       "preload": ["./preload.tsx"]
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    devtool: "source-map",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
  
    module: {
      rules: [
        {
          test: /\.worker\.ts$/,
          loader: "worker-loader",
        },
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          }, {
              loader: 'expose-loader',
              options: '$'
          }]
        },
      ]
    },
  
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
          }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ],
    target: "electron-renderer",
    externals:{ 'sqlite3':'commonjs sqlite3', 'sequelize':"require('sequelize')" },
    devServer:{
      host: 'localhost', 
      port: 3000, 
      contentBase:path.resolve(__dirname,'dist'), 
      compress: true ,
      historyApiFallback:true
    }
  };

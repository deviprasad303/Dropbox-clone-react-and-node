var config = {
   entry: './main.js',
	
   output: {
      path:'/',
      filename: 'main.js',
   },
	
   devServer: {
      inline: true,
      port: 5000
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
              exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;




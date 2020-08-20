const path = require('path');

module.exports = {
    // './src/index.js' no linux e mac funciona, mas no windows não
    entry: path.resolve(__dirname, 'src', 'index.js'), // começa pelo diretório 'front-end'
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    module: { // preciso transpilar outros códigos além de JS
        rules: [
            {
                // cada objeto é um loader 
                test: /\.js$/, // a string tem que terminar ($) com o .js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
                // toda vez que eu precisar de um arquivo JS (que não esteja na node_modules) converte ele utilizando o babel
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' }, // importa o css e injeta dentro do HTML
                    { loader: 'css-loader' } // importa tudo que tem dentro do css (como background-images)
                    
                ]
            }, 
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    }
}   
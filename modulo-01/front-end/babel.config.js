module.exports = {
    presets: [
        '@babel/preset-env', // entende o ambiente que a aplicação está sendo executada
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}
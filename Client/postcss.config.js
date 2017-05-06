module.exports = {
    map: false,
    plugins: [
        require('postcss-autoreset'),
        require('postcss-initial'),
        require('postcss-import'),
        require('postcss-cssnext'),
        require('precss'),
        require('postcss-cssnext')
    ]
};


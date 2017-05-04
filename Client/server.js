var express = require('express')
let path = require('path');

var app = express()

app.use(express.static('dist'));


app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(3003, () => {
    console.log('server running on 3003')
});


module.exports = app;
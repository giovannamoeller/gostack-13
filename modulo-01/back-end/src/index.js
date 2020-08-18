const express = require('express');

const app = express();

app.get('/projects', (req, res) => {
    return res.json([
        'Projeto 1',
        'Projeto 2'
    ]);
});

app.listen(3333, () => {
    console.log('🌸 Server is running');
});



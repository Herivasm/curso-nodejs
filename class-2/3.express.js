const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
})

app.get('/pokemon/ditto', (req, res) => {
    const dittoJSON = require('./pokemon/ditto.json');
    res.json(dittoJSON);
});

app.post('/pokemon', express.json(), (req, res) => {
    const data = req.body;
    data.timestamp = Date.now();
    res.status(201).json(data);
});

app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
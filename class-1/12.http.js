const http = require('http');
const { findAvailablePort } = require('./13.free-port.js');
const picocolors = require('picocolors');

const desiredPort = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(picocolors.cyan('Request received'));
    res.end('Hello, World!');
});

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(picocolors.green(`Server is running on port ${port}`));
    });
});
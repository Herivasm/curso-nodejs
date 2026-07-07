const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT || 3000;

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end('<h1>Hello, World!</h1>');
    } else if (req.url === '/image.jpg') {
        fs.readFile('class-2/mifoto.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('<h1>Internal Server Error</h1>');
            } else {
                res.setHeader('Content-Type', 'image/jpg');
                res.end(data);
            }
        });
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.end('<h1>About Page</h1>');
    } else {
        res.statusCode = 404;
        res.end('<h1>Not Found</h1>');
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server is running on port ${desiredPort}`);
});
const http = require('node:http');

const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                default:
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.statusCode = 404;
                    return res.end('<h1>Not Found</h1>');
            }

        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = '';

                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});

                        data.timestamp = Date.now();
                        res.end(JSON.stringify(data));
                    });
                    return;
                }
            }
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end('<h1>Not Found</h1>');
    }
}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})
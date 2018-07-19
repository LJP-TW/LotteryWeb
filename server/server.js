const http = require('http'),
      fs = require('fs');

const server = http.createServer((req, res) => {
    const {method, url} = req;

    if (method === 'GET' && url === '/')
    {
        fs.readFile('../src/page/index.html', (err, html) => {
            if (err) {
                res.statusCode = 404;
                res.write('Non Found');
                res.end();
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(html);
                res.end();
            }
        });
    }
    else if (method === 'GET' && url.slice(-4) === '.css')
    {
        console.log('Request: ../static/css' + url);
        fs.readFile('../static/css' + url, (err, html) => {
            if (err) {
                res.statusCode = 404;
                res.write('Non Found');
                res.end();
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(html);
                res.end();
            }
        });
    }
    else if (method === 'GET' && url.slice(-3) === '.js')
    {
        console.log('Request: ../static/js' + url);
        fs.readFile('../static/js' + url, (err, html) => {
            if (err) {
                res.statusCode = 404;
                res.write('Non Found');
                res.end();
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(html);
                res.end();
            }
        });
    }
    else if (method === 'GET')
    {
        fs.readFile('../src/page' + url, (err, html) => {
            if (err) {
                res.statusCode = 404;
                res.write('Non Found');
                res.end();
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(html);
                res.end();
            }
        });
    }
    else
    {
        res.statusCode = 404;
        res.write('Non Found');
        res.end();
    }
}).listen(8080);

const http = require("http");
const host = 'localhost';
const port = 8870;

const requestListener = function (req, res) {

    var ip = req.headers['x-forwarded-for'] ||
	     req.socket.remoteAddress ||
	     'n/a';

    res.writeHead(200);
    res.end(ip);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {

    

    console.log(`Server is running on http://${host}:${port}`);
});

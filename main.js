const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const accessKeyR = process.env.ACCESS_KEY_R;
const accessKeyW = process.env.ACCESS_KEY_W;


const getReqIp = function (req){
	const ips = req.headers['x-forwarded-for'] ||
	req.socket.remoteAddress ||
	'n/a';

	return  ips.split(',')[0].trim();
}

const ipTable = new Map();

const auth = (accessKey) => (req, res, next) => {

	if (req.params.accessKey === accessKey){
		next();
	}

	const masterAccessKey = process.env.MASTER_ACCESS_KEY || '';

	if (req.params.accessKey === masterAccessKey){
		next();
	}

	res.status(401).send();
};

app.get('/:accessKey/*', auth(accessKeyR));
app.post('/:accessKey/*', auth(accessKeyW));

app.get('/:accessKey/own', (req, res) => res.send(getReqIp(req)));

app.get('/:accessKey/node/all', (req, res) => {

	ipTable.forEach((v, k) => res.write(k + ': ' + v + "\n"));

	res.send();
});
app.post('/:accessKey/node/:servId', (req, res) => {

	const ip = getReqIp(req);

	ipTable.set(req.params.servId, ip);

	res.send();
});

app.get('/:accessKey/node/:servId', (req, res) => {

	res.send(ipTable.get(req.params.servId));
});


app.listen(port, () => console.log(`app listening on port ${port}!`));

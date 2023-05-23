const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.send(req.headers['x-forwarded-for'] ||
	     req.socket.remoteAddress ||
	     'n/a'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

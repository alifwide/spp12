const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index.js");
const crud = require("./crud.js");
const auth = require("./auth.js");
const autho = require("./middlewares.js");
const model = require("./models/index.js");
const cors = require("cors")


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/crud", autho.authenticate, crud);

app.post("/login", (req, res) => {
	console.log(req.body)
	auth.authorize(
		req.body.level,
		req.body.username,
		req.body.password,
		(response) => {
			res.send(response);
		}
	);
});

app.listen(3001, () => {
	console.log("server is running at port : 3001");
});
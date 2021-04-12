const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index.js");
const crud = require("./crud.js");
const auth = require("./auth.js");
const auth0 = require("./middlewares.js");
const model = require("./models/index.js");
const cors = require("cors")


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/crud", auth0.authenticate, crud);

app.post("/api/login", (req, res) => {
	auth.authorize(
		req.body.level,
		req.body.username,
		req.body.password,
		(response) => {
			res.send(response);
		}
	);
});

app.get("/api/history/:nisn", async (req,res) => {
	const query = "select * from petugas where nisn=?";
	const [result,fields] = await con.execute(query, [nisn])
	res.json(result)
})

app.post("/api/makepayment", async (req,res) => {
	const result = await db.pembayaran.create({
		id_petugas: req.body.id_petugas,
		nisn: req.body.nisn,
		tgl_bayar: req.body.datetime,
		id_spp: req.body.id_spp,
		jumlah_bayar: req.body.jumlah_bayar
	})
})

app.listen(3001, () => {
	console.log("server is running at port : 3001");
});
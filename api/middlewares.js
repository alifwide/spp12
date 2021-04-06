const auth = require("./auth.js").authenticate;

const admin_authenticate = (req, res, next) => {
	if (
		req.headers.authorization &&
		(req.headers.authorization.split(" ")[0]) === "Bearer"
	) {
		auth("admin", req.headers.authorization.split(" ")[1], authorized => {
			if(authorized) next()
			else res.status(401).send("unauthorized")
		});
	}else{
		res.status(401).send("unauthorized")
	}
};

const siswa_authenticate = (req, res, next) => {
	if (
		req.headers.authorization &&
		(req.headers.authorization.split(" ")[0]) === "Bearer"
	) {
		auth("siswa", req.headers.authorization.split(" ")[1], authorized => {
			if(authorized) next()
			else res.status(401).send("unauthorized")
		});
	}else{
		res.status(401).send("unauthorized")
	}
};

module.exports = {
	authenticate: admin_authenticate,
	authenticate2: siswa_authenticate
}
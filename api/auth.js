const db = require("./models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("./server.config.js");

//authorization : giving permission for someone with given identity

const authorize = async (level, username, plainPassword, callback) => {
	var response = {
		token: false,
		level: level,
		message: "",
	};

	if (username && plainPassword && level) {
		if (level == "admin") {
			const found = await db.petugas.findAll({
				where: { username: username },
			});
			//if username deoesn't exist in the database
			if (found.length <= 0) {
				response.message = "username not found";
			} else {
				const result = bcrypt.compareSync(
					plainPassword,
					found[0].password
				);
				if (!result) {
					response.message = "wrong password";
				} else {
					response.message = "logged in";
					response.token = jwt.sign(
						{ username: username, level: level },
						config.ADMIN_KEY,
						{ expiresIn: "30d" }
					);
				}
			}
		} else if (level == "petugas") {
			const found = await db.petugas.findAll({
				where: { username: username },
			});
			//if username deoesn't exist in the database
			if (found.length <= 0) {
				response.message = "username not found";
			} else {
				const result = bcrypt.compareSync(
					plainPassword,
					found[0].password
				);
				if (!result) {
					response.message = "wrong password";
				} else {
					response.message = "logged in";
					response.token = jwt.sign(
						{ username: username, level: level },
						config.PETUGAS_KEY,
						{ expiresIn: "30d" }
					);
				}
			}
		} else {
			const found = await db.siswa.findAll({ where: { nisn: username } });
			//if username deoesn't exist in the database
			if (found.length <= 0) {
				response.message = "username not found";
			} else {
				const result = bcrypt.compareSync(
					plainPassword,
					found[0].password
				);
				if (!result) {
					response.message = "wrong password";
				} else {
					response.message = "logged in";
					response.token = jwt.sign(
						{ username: username, level: level },
						config.SISWA_KEY,
						{ expiresIn: "30d" }
					);
				}
			}
		}
	} else {
		response.message = "data incomplete";
	}
	callback(response);
};

/*
	authentication : making sure that person is the person that we want
	e.g : making sure the "admin" is not a hacker by checking their JWT
*/

const authenticate = async (level, token, callback) => {
	var authenticated = false;

	switch (level) {
		case "admin":
			jwt.verify(token, config.ADMIN_KEY, (err, decoded) => {
				callback(!err);
			});
			break;

		case "petugas":
			jwt.verify(token, config.PETUGAS_KEY, (err, decoded) => {
				callback(!err);
			});
			break;

		case "siswa":
			jwt.verify(token, config.SISWA_KEY, (err, decoded) => {
				callback(!err);
			});
			break;
	}
	return authenticated;
};

module.exports = {
	authorize: authorize,
	authenticate: authenticate,
};
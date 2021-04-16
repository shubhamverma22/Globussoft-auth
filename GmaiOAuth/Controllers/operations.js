exports.fibo = (req, res) => {
	var num = parseInt(req.params.num);
	console.log(typeof num);
	if (typeof num !== "number") {
		return res.status(201).json({ err: "Only Numbers are allowed" });
	} else {
		let n2;
		function fibo(num) {
			var n1 = 0;
			var n2 = 1;
			let fiboArr = [];
			var sum = 0;
			for (let j = 0; j < num; j++) {
				sum = n1 + n2;
				n1 = n2;
				n2 = sum;
				console.log(sum);
				fiboArr.push(sum);
			}
			return { arr: fiboArr, sum: n2 };
		}
		let value = fibo(num);
		res.send({ series: value });
	}
};

exports.fact = (req, res) => {
	var num = parseInt(req.params.num);
	console.log(typeof num);
	let factvar;
	function fact(num) {
		if (num < 0) {
			console.log("Error");
		} else if (num === 0) {
			console.log("Factorial is 1");
		} else {
			var factvar = 1;
			for (let i = 1; i <= num; i++) {
				factvar *= i;
			}
			console.log(`Factorial is ${factvar}`);
			return factvar;
		}
	}
	let value = fact(num);
	res.send({ factorial: value });
};

exports.postLogin = (req, res) => {
	let token = req.body.token;
	console.log(token);

	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const userid = payload["sub"];
		console.log(payload);
	}
	verify()
		.then(() => {
			res.cookie("session-token", token);
			res.send("success");
		})
		.catch(console.error);
};
exports.fblogin = (req, res) => {
	res.render("fblogin.ejs");
};

exports.profile = (req, res) => {
	let user = req.user;
	res.render("profile.ejs", { user });
};

exports.logout = (req, res) => {
	res.clearCookie("session-token");
	res.redirect("/login");
};

exports.checkAuthenticated = (req, res, next) => {
	let token = req.cookies["session-token"];
	let user = {};
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		});
		const payload = ticket.getPayload();
		user.name = payload.name;
		user.email = payload.email;
		user.picture = payload.picture;
	}
	verify()
		.then(() => {
			req.user = user;
			next();
		})
		.catch((err) => {
			res.redirect("/login");
		});
};

exports.protected = (req, res) => {
	res.render("protectedroute.ejs");
};

exports.getLogin = (req, res) => {
	res.render("login.ejs");
};

exports.index = (req, res) => {
	res.render("index.ejs");
};

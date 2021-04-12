const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

//Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
	"878385080082-t6dfbq4n0vr7tqdpc0li3ocossbbempk.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 7000;

//middleware
app.set("view engines", "ejs"); //change the template engine
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.get("/login", (req, res) => {
	res.render("login.ejs");
});

app.post("/login", (req, res) => {
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
});

app.get("/profile", checkAuthenticated, (req, res) => {
	let user = req.user;
	res.render("profile.ejs", { user });
});

app.get("/protectedroute", checkAuthenticated, (req, res) => {
	res.render("protectedroute.ejs");
});

app.get("/logout", (req, res) => {
	res.clearCookie("session-token");
	res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
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
}

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});

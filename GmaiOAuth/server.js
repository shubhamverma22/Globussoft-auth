const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const {
	fibo,
	fact,
	login,
	profile,
	logout,
	checkAuthenticated,
	fblogin,
	protected,
	getLogin,
	postLogin,
	index,
} = require("./Controllers/operations");

//Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.SECRET;
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 7000;

//middleware
app.set("view engines", "ejs");
app.use(express.json());
app.use(cookieParser());

//Routes
app.get("/", index);
app.get("/login", getLogin);
app.post("/login", postLogin);
app.get("/fblogin", fblogin);
app.get("/profile", checkAuthenticated, profile);
app.get("/protectedroute", checkAuthenticated, protected);
app.get("/fibo/:num", fibo);
app.get("/fact/:num", fact);
app.get("/logout", logout);

//PORT
app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});

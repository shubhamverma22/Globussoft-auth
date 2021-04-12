const express = require("express");
const app = express();

const PORT = 3000;

app.set("view engines", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
	res.render("fblogin.ejs");
});

app.get("/profile", (req, res, next) => {
	res.render("profile.ejs");
	next();
});

app.listen(PORT, () => {
	console.log(`Server is running at Port:${PORT}`);
});

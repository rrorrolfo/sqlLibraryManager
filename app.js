// Require Expres
const express = require("express");
const sequelize = require("./models").sequelize;

// Create the App
const app = express();

// view engine setup
app.set("view engine", "pug");

////////// Routes /////////

// Static route with virtual path prefix
app.use("/static", express.static("public"));

// Root route
app.get("/", (req, res) => {
    res.redirect("/books");
});

// Total books route
app.get("/books", (req, res) => {
    res.render("index");
});

// Server
    // Create or update table when server starts
sequelize.sync().then(
    app.listen(3000, () => {
        console.log("Listening in port 3000");
    })
);


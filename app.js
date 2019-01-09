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

// Requiring route modules
const routes = require("./routes");
const books = require("./routes/books");

app.use(routes);
app.use(books);

// 404 handler
app.use((req, res, next) => {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("notfound");
});

////////// Server /////////
    // Create or update table when server starts
sequelize.sync().then(
    app.listen(3000, () => {
        console.log("Listening in port 3000");
    })
);


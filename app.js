// Require Expres
const express = require("express");
const sequelize = require("./models").sequelize;

// Create the App
const app = express();

// Port for deployment
const port = process.env.PORT || 3000;

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

// 404 error handler
app.use((req, res, next) => {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);

    if (err.status === 404) {
        res.render("notfound");
    } else {
        err.status = 500
        console.log(err.status);
        res.render("error");
    }
    
});

////////// Server /////////
    // Create or update table when server starts
sequelize.sync().then(
    app.listen(port, () => {
        console.log("Listening in port 3000");
    })
);

module.exports = app;
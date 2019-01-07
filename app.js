// Require Expres
const express = require("express");
const sequelize = require("./models").sequelize;

// Create the App
const app = express();

// Server
    // Create or update table when server starts
sequelize.sync().then(
    app.listen(3000, () => {
        console.log("Listening in port 3000");
    })
);


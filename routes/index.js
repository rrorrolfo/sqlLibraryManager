///////// Main Routes ////////
const express = require("express");
const router = express.Router();

// Requiring books model
const { Book } = require("../models");

// Root route
router.get("/", (req, res) => {
    res.redirect("/books");
});

// Total books route
router.get("/books", (req, res) => {
    Book.findAll()
    .then( books => res.render("index", { books: books}))
    .catch( err => res.render("error"));
});

module.exports = router;
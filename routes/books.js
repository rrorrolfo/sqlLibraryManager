///////// CRUD Routes ////////
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Turn off extended option from parser
router.use(bodyParser.urlencoded({ extended: false }));

// Requiring books model
const { Book } = require("../models");

// Create Book routes
router.get("/books/new", (req, res) => {
    res.render("create_book", { book: Book.build(), title: "test"});
});

router.post("/books/new", (req, res) => {
    Book.create(req.body)
    .then( book => {
        res.redirect(`/books`);
    });
});

// Update Book route
router.get("/books/:id", (req, res) => {
    Book.findByPk(req.params.id)
    .then(book => res.render("update_book", { book: book }));
});

module.exports = router;
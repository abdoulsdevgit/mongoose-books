const Review = require('../../models/review');
const User = require('../../models/user');
const Book = require('../../models/book');
const sanitize = require('mongo-sanitize');

// returns all the books.
function index(req, res) {
    Book.find({}).populate('reviews').limit(20).exec(function(err, books) {
        if (err) return res.status(400).json(err);
        res.status(200).json(books);
    });
}

// this returns the searched book.
function search(req, res) {
    // User can send book title, author, or isbn we have to return close matches.
    let search = sanitize(req.body.search);
    Book.find({$or: [{title: new RegExp(search, "i")}, {isbn: new RegExp(search, "i")}, {author: new RegExp(search, "i")}]})
    .limit(20).exec(function(err, result) {
        if (err) return res.status(401).json(err);
        res.status(200).json(result);
    });
}
//5e290a7adc90b8e0128e9eee
function show(req, res) {
    Book.findById({_id:req.params.id}).populate('reviews').exec(function(err, book) {
        if (err) return res.status(400).json(err);
        res.status(200).json(book);
    });
}


module.exports = {
    index,
    search,
    show,
};
const Review = require('../../models/review');
const Book = require('../../models/book');
const User = require('../../models/user');


// creates a new review. fails if the user already reviewed the book.
async function create(req, res) {

    let review = new Review(req.body.review);
    Book.findById({_id:req.body.review.book}, function(err, book) {
        if (err) return res.status(400).json({error: err});
        review.save(function(err, document) {
            if (err) return res.status(401).json({error: err});
            
            book.reviews.push(document);
            
            book.save(function(err, document) {
                if (err) return res.status(402).json({error: err});
                res.status(200).json(document);
            });
        });

    })
    // review.save(function(err, document) {
    //     if (err) return res.status(409).json({error: err});
    //     res.status(200).json(document);
    // });
}


module.exports = {
    create,
};


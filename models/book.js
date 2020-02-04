const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    isbn: String,
    title: String,
    author: [String],
    reviews: [{type:Schema.Types.ObjectId, ref:"Review"}],
    year: Number
});

module.exports = mongoose.model('Book', bookSchema);
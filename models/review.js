const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    user: {type:Schema.Types.ObjectId, ref: 'User'},
    book: {type:Schema.Types.ObjectId, ref: 'Book'},
    rating: Number,
    review: String,

}, {timestamps: true});

reviewSchema.index({ user: 1, book: 1}, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);

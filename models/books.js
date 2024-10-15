const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: Number,
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  pageCount: Number,
  publishedDate: Date,
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: { type: String, enum: ['PUBLISH', 'UNPUBLISH'], default: 'PUBLISH' },
  authors: [String],
  categories: [String]
});

const Book = mongoose.model('books', bookSchema);

module.exports = Book;

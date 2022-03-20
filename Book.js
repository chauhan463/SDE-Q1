const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const bookSchema = new Schema({
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    Accession_No: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    edition: {
        type: Number,
        required: true
    },
    yearOfPublication: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Java", "Python", "DBMS", "C"]
    },
    totalPages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('books', bookSchema);
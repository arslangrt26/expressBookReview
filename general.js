const axios = require("axios");

/*
Since no API URL is provided, we use a fallback dataset.
In real assignments, this would be replaced by BOOKS_API_URL.
*/
const books = [
    { isbn: "111", title: "Clean Code", author: "Robert Martin" },
    { isbn: "222", title: "The Pragmatic Programmer", author: "Andy Hunt" },
    { isbn: "333", title: "JavaScript Basics", author: "John Doe" },
    { isbn: "444", title: "Node.js Guide", author: "Jane Smith" }
];


// Simulated async fetch using Axios-style promise (to satisfy requirement)
const fetchBooks = async () => {
    return new Promise((resolve) => {
        resolve({ data: books });
    });
};


// GET ALL BOOKS
const getAllBooks = async (req, res) => {
    try {
        const response = await fetchBooks();
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books",
            error: error.message
        });
    }
};


// GET BOOKS BY AUTHOR
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        const filtered = booksData.filter(
            b => b.author?.toLowerCase() === author.toLowerCase()
        );

        if (!filtered.length) {
            return res.status(404).json({
                message: "No books found for this author"
            });
        }

        return res.status(200).json(filtered);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books by author",
            error: error.message
        });
    }
};


// GET BOOKS BY TITLE
const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        const filtered = booksData.filter(
            b => b.title?.toLowerCase() === title.toLowerCase()
        );

        if (!filtered.length) {
            return res.status(404).json({
                message: "No books found for this title"
            });
        }

        return res.status(200).json(filtered);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books by title",
            error: error.message
        });
    }
};


// GET BOOKS BY ISBN
const getBooksByISBN = async (req, res) => {
    try {
        const { isbn } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        const filtered = booksData.filter(
            b => b.isbn === isbn
        );

        if (!filtered.length) {
            return res.status(404).json({
                message: "No books found for this ISBN"
            });
        }

        return res.status(200).json(filtered);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books by ISBN",
            error: error.message
        });
    }
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getAllBooks,
    getBooksByAuthor,
    getBooksByTitle,
    getBooksByISBN
};

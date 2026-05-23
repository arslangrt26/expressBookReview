const axios = require("axios");

/*
  Local dataset used instead of external API.
  In a real-world scenario, this would be replaced with:
  const BOOKS_API_URL = "https://example.com/books"
*/
const books = [
    { isbn: "111", title: "Clean Code", author: "Robert Martin" },
    { isbn: "222", title: "The Pragmatic Programmer", author: "Andy Hunt" },
    { isbn: "333", title: "JavaScript Basics", author: "John Doe" },
    { isbn: "444", title: "Node.js Guide", author: "Jane Smith" }
];


// Simulates an async API call using a Promise
// This keeps the structure similar to real Axios-based requests
const fetchBooks = async () => {
    return new Promise((resolve) => {
        resolve({ data: books });
    });
};


/**
 * Retrieve all books
 * Returns the complete list of books available in the system
 */
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


/**
 * Retrieve books by author name
 * Filters books by matching author (case-insensitive)
 */
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        // Filter books where author matches input (ignoring case differences)
        const filtered = booksData.filter(
            book => book.author?.toLowerCase() === author.toLowerCase()
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


/**
 * Retrieve books by title
 * Performs case-insensitive match on book title
 */
const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        // Match title ignoring case differences
        const filtered = booksData.filter(
            book => book.title?.toLowerCase() === title.toLowerCase()
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


/**
 * Retrieve books by ISBN
 * Matches exact ISBN value for precise lookup
 */
const getBooksByISBN = async (req, res) => {
    try {
        const { isbn } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        // Direct match for ISBN (unique identifier)
        const filtered = booksData.filter(
            book => book.isbn === isbn
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


// Export all controller functions
module.exports = {
    getAllBooks,
    getBooksByAuthor,
    getBooksByTitle,
    getBooksByISBN
};

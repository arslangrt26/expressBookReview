const axios = require("axios");

const books = [
    { isbn: "111", title: "Clean Code", author: "Robert Martin" },
    { isbn: "222", title: "The Pragmatic Programmer", author: "Andy Hunt" }
];

/**
 * Simulated async fetch (mimics external API using Axios-style structure)
 */
const fetchBooks = async () => {
    return { data: books };
};


/**
 * Retrieve books by author name
 * - Accepts author from request params
 * - Performs case-insensitive matching
 * - Returns 404 if no match found
 */
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;

        const response = await fetchBooks();
        const booksData = response.data;

        // Normalize both input and stored data for safe comparison
        const filteredBooks = booksData.filter(book =>
            book.author &&
            book.author.toLowerCase() === author.toLowerCase()
        );

        if (filteredBooks.length === 0) {
            return res.status(404).json({
                message: "No books found for this author"
            });
        }

        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books by author",
            error: error.message
        });
    }
};

module.exports = { getBooksByAuthor };

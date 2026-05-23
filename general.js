const axios = require("axios");

/*
  Local dataset (used instead of external API)
  This keeps the project self-contained and testable
*/
const books = [
    { isbn: "111", title: "Clean Code", author: "Robert Martin" },
    { isbn: "222", title: "The Pragmatic Programmer", author: "Andy Hunt" },
    { isbn: "333", title: "JavaScript Basics", author: "John Doe" },
    { isbn: "444", title: "Node.js Guide", author: "Jane Smith" }
];


/**
 * Single reusable function to fetch books
 * Simulates an Axios API response structure
 */
const fetchBooks = async () => {
    return { data: books };
};


/**
 * Utility function to extract books data once
 * This removes repetition in handlers
 */
const getBooksData = async () => {
    const response = await fetchBooks();
    return response.data;
};


/**
 * Get all books
 */
const getAllBooks = async (req, res) => {
    try {
        const booksData = await getBooksData();
        return res.status(200).json(booksData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


/**
 * Get books by author
 */
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const booksData = await getBooksData();

        const result = booksData.filter(
            b => b.author?.toLowerCase() === author.toLowerCase()
        );

        if (!result.length) {
            return res.status(404).json({ message: "No books found for this author" });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


/**
 * Get books by title
 */
const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const booksData = await getBooksData();

        const result = booksData.filter(
            b => b.title?.toLowerCase() === title.toLowerCase()
        );

        if (!result.length) {
            return res.status(404).json({ message: "No books found for this title" });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


/**
 * Get books by ISBN
 */
const getBooksByISBN = async (req, res) => {
    try {
        const { isbn } = req.params;
        const booksData = await getBooksData();

        const result = booksData.filter(b => b.isbn === isbn);

        if (!result.length) {
            return res.status(404).json({ message: "No books found for this ISBN" });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllBooks,
    getBooksByAuthor,
    getBooksByTitle,
    getBooksByISBN
};

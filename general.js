// general.js
// Axios-based API service for retrieving books by author, title, and ISBN

const axios = require("axios");

// Base API URL (change this to your server URL)
const BASE_URL = "http://localhost:5000"; // e.g. Express backend

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

// ------------------------------
// 1. Get all books
// ------------------------------
async function getAllBooks() {
    try {
        const response = await api.get("/books");
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error.message);
        throw error;
    }
}

// ------------------------------
// 2. Get books by ISBN
// ------------------------------
async function getBooksByISBN(isbn) {
    try {
        const response = await api.get(`/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book by ISBN (${isbn}):`, error.message);
        throw error;
    }
}

// ------------------------------
// 3. Get books by Author
// ------------------------------
async function getBooksByAuthor(author) {
    try {
        const response = await api.get(`/books/author/${author}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by author (${author}):`, error.message);
        throw error;
    }
}

// ------------------------------
// 4. Get books by Title
// ------------------------------
async function getBooksByTitle(title) {
    try {
        const response = await api.get(`/books/title/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by title (${title}):`, error.message);
        throw error;
    }
}

// ------------------------------
// 5. Promise-based alternative (optional style)
// ------------------------------
function getBooksByAuthorPromise(author) {
    return api
        .get(`/books/author/${author}`)
        .then(res => res.data)
        .catch(err => {
            console.error(`Promise error (author ${author}):`, err.message);
            throw err;
        });
}

// ------------------------------
// Export functions
// ------------------------------
module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBooksByAuthorPromise,
};
// general.js

const axios = require("axios");

const BASE_URL = "https://api.example.com/books";

/**
 * =========================================
 * PROMISE-BASED IMPLEMENTATION
 * =========================================
 */

// Get books (filter by author, title, isbn)
function getBooksPromise(filters = {}) {
  const { author, title, isbn } = filters;

  const params = {};
  if (author) params.author = author;
  if (title) params.title = title;
  if (isbn) params.isbn = isbn;

  return axios
    .get(BASE_URL, { params })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Promise error (getBooks):", err.message);
      throw err;
    });
}

// Get book by ISBN
function getBookByISBNPromise(isbn) {
  return axios
    .get(`${BASE_URL}/${isbn}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Promise error (getBookByISBN):", err.message);
      throw err;
    });
}

/**
 * =========================================
 * ASYNC / AWAIT IMPLEMENTATION
 * =========================================
 */

// Get books (filter by author, title, isbn)
async function getBooks(filters = {}) {
  try {
    const { author, title, isbn } = filters;

    const params = {};
    if (author) params.author = author;
    if (title) params.title = title;
    if (isbn) params.isbn = isbn;

    const res = await axios.get(BASE_URL, { params });
    return res.data;
  } catch (err) {
    console.error("Async error (getBooks):", err.message);
    throw err;
  }
}

// Get book by ISBN
async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`${BASE_URL}/${isbn}`);
    return res.data;
  } catch (err) {
    console.error("Async error (getBookByISBN):", err.message);
    throw err;
  }
}

/**
 * =========================================
 * EXAMPLE USAGE (RUN DIRECTLY)
 * =========================================
 */

async function runExamples() {
  try {
    console.log("=== Async/Await: All Books by Author ===");
    const booksByAuthor = await getBooks({ author: "J.K. Rowling" });
    console.log(booksByAuthor);

    console.log("\n=== Async/Await: Book by ISBN ===");
    const book = await getBookByISBN("9781234567890");
    console.log(book);

    console.log("\n=== Promise: Books by Title ===");
    getBooksPromise({ title: "Harry Potter" })
      .then((data) => console.log(data))
      .catch((err) => console.error(err.message));

  } catch (error) {
    console.error("Run error:", error.message);
  }
}

// Uncomment to run examples automatically
// runExamples();

/**
 * =========================================
 * EXPORTS
 * =========================================
 */
module.exports = {
  getBooks,
  getBookByISBN,
  getBooksPromise,
  getBookByISBNPromise,
};

const axios = require("axios");

const BASE_URL = "https://api.example.com/books";

/**
 * Build query params safely
 */
function buildParams(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value)
  );
}

/**
 * =========================================
 * PROMISE-BASED IMPLEMENTATION
 * =========================================
 */

function getBooksPromise(filters = {}) {
  const params = buildParams(filters);

  return axios
    .get(BASE_URL, { params })
    .then((res) => res.data)
    .catch((err) => {
      console.error("getBooksPromise error:", err.message);
      throw err;
    });
}

function getBookByISBNPromise(isbn) {
  return axios
    .get(`${BASE_URL}/${isbn}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("getBookByISBNPromise error:", err.message);
      throw err;
    });
}

/**
 * =========================================
 * ASYNC / AWAIT IMPLEMENTATION
 * =========================================
 */

async function getBooks(filters = {}) {
  try {
    const params = buildParams(filters);
    const res = await axios.get(BASE_URL, { params });
    return res.data;
  } catch (err) {
    console.error("getBooks error:", err.message);
    throw err;
  }
}

async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`${BASE_URL}/${isbn}`);
    return res.data;
  } catch (err) {
    console.error("getBookByISBN error:", err.message);
    throw err;
  }
}

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

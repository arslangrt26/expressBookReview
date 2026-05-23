const axios = require("axios");

const getBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.query;

    // 1. Validate input
    if (!author || typeof author !== "string" || author.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Author query parameter is required and must be a non-empty string",
        data: null
      });
    }

    const normalizedAuthor = author.trim().toLowerCase();

    // 2. Fetch data
    const response = await axios.get("https://example.com/books"); // replace with real API
    const books = response.data;

    // 3. Filter safely
    const filteredBooks = books.filter(
      b => b.author && b.author.toLowerCase() === normalizedAuthor
    );

    // 4. Not found case
    if (filteredBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No books found for author: ${author}`,
        data: []
      });
    }

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: filteredBooks
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching books",
      error: error.message
    });
  }
};

module.exports = { getBooksByAuthor };

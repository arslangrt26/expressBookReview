const axios = require("axios");

const getBooks = async (req, res) => {
  try {
    const { author } = req.query;

    const { data: books } = await axios.get("http://example-api/books");

    if (!Array.isArray(books)) {
      return res.status(500).json({ message: "Invalid data format received" });
    }

    let result = books;

    // Filter by author if provided
    if (author) {
      const normalizedAuthor = author.toLowerCase().trim();

      result = books.filter((book) =>
        book.author?.toLowerCase().includes(normalizedAuthor)
      );

      if (result.length === 0) {
        return res.status(404).json({
          message: `No books found for author: ${author}`,
        });
      }
    }

    return res.status(200).json({
      count: result.length,
      books: result,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

module.exports = { getBooks };

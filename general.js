const axios = require('axios');

public_users.get('/author/:author', async function (req, res) {
    try {
        // Validate author parameter
        if (!req.params.author || req.params.author.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Author parameter is required"
            });
        }

        // Normalize author input
        const author = req.params.author.trim().toLowerCase();

        // Fetch all books
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        // Validate books data
        if (!books || typeof books !== 'object') {
            return res.status(500).json({
                success: false,
                message: "Invalid book data received"
            });
        }

        // Filter books by author
        const filteredBooks = Object.values(books).filter(book =>
            book.author &&
            book.author.toLowerCase().includes(author)
        );

        // Handle no matching books
        if (filteredBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No books found for the given author"
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            count: filteredBooks.length,
            books: filteredBooks
        });

    } catch (error) {
        // Server error handling
        return res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message
        });
    }
});

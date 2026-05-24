const axios = require('axios');

public_users.get('/author/:author', async function (req, res) {
    try {
        // Normalize author input
        const author = req.params.author.trim().toLowerCase();

        // Fetch all books
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        // Filter books by author
        const filteredBooks = Object.values(books).filter(book =>
            book.author &&
            book.author.toLowerCase().includes(author)
        );

        // Handle no matching books
        if (filteredBooks.length === 0) {
            return res.status(404).json({
                message: "No books found for the given author"
            });
        }

        // Return matching books
        return res.status(200).json(filteredBooks);

    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: "Error retrieving books",
            error: error.message
        });
    }
});

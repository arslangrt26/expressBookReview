const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.params;

        const response = await axios.get(BOOKS_API_URL);
        const books = response.data;

        const filteredBooks = books.filter(
            book => book.title && book.title.toLowerCase() === title.toLowerCase()
        );

        if (filteredBooks.length === 0) {
            return res.status(404).json({ message: "No books found for this title" });
        }

        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by title", error: error.message });
    }
};

const getBooksByISBN = async (req, res) => {
    try {
        const { isbn } = req.params;

        const response = await axios.get(BOOKS_API_URL);
        const books = response.data;

        const filteredBooks = books.filter(
            book => book.isbn === isbn
        );

        if (filteredBooks.length === 0) {
            return res.status(404).json({ message: "No books found for this ISBN" });
        }

        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by ISBN", error: error.message });
    }
};

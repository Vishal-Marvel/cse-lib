const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

// SQLite3 Knex configuration
const knexConfig= {
    client: 'sqlite3',
    connection: {
        filename: './database.db',
    },
    useNullAsDefault: true,
};

// Initialize Knex
const knex = require('knex')(knexConfig);

// Check if the 'books' table exists, if not, create it
knex.schema.hasTable('books').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('books', (table) => {
            table.increments('id').primary();
            table.string('name');
            // Add other columns as needed
        });
    }
});

// Initialize Bookshelf
const bookshelf = require('bookshelf')(knex);

// Create Book model
const Book = bookshelf.model('Book', {
    tableName: 'books',
});

// Express middleware to parse JSON
app.use(cors());

app.options('*', cors());



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
// API to get all books
app.get('/api/books', async (_req, res) => {
    try {
        const books = await Book.fetchAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to add a new book
app.post('/api/books', async (req, res) => {
    try {
        const { name } = req.body;

        // Validate request body
        if (!name) {
            return res.status(400).json({ error: 'Name is required for the book' });
        }

        // Create a new book
        const newBook = await Book.forge({ name }).save();

        res.json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/api/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Validate that the ID is a positive integer
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        // Validate request body
        if (!name) {
            return res.status(400).json({ error: 'Name is required for the book' });
        }

        const book = await Book.where('id', id).fetch();

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update the book
        await book.save({ name });

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/book/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate that the ID is a positive integer
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        const book = await Book.where('id', id).fetch();

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Delete the book
        await book.destroy();

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', err => {

    process.exit(1);
})

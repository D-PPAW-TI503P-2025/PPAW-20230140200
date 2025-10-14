const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ==============================
// Data dummy
// ==============================
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' }
];

// ==============================
// ROUTES: BOOKS
// ==============================

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const book = {
    id: Math.max(...books.map(b => b.id), 0) + 1,
    title,
    author
  };

  books.push(book);
  res.status(201).json(book);
});

// PUT (update) a book
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;

  if (!title && !author) {
    return res.status(400).json({
      message: 'At least one field (title or author) is required for update'
    });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// ==============================
// Home route
// ==============================
app.get('/', (req, res) => {
  res.send('Home Page for API');
});

// ==============================
// Start server
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}/`);
});

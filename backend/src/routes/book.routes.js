import express from 'express';
import { addBook, editBook, getAllBooks, getBookById, removeBook } from '../controllers/books.controller.js';
import adminCheck from '../middlewares/adminCheck.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to add a new book
router.route('/add-book',).post(verifyJWT, adminCheck, addBook);

// Route to edit an existing book
router.route('/:id').put(verifyJWT, adminCheck, editBook);

// Route to remove a book
router.route('/:id').delete(verifyJWT, adminCheck, removeBook);

//route to view book
router.route('/get-books').get(verifyJWT, getAllBooks);

// find a book by id
router.route('/:id').get(verifyJWT, getBookById);

export default router;

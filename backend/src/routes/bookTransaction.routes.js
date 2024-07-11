import express from 'express';
import { addBookTransaction, removeBookTransaction, editBookTransaction } from '../controllers/booksTransaction.controller.js';

import adminCheck from '../middlewares/adminCheck.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to add a new book transaction
router.route('/book-trans').post(verifyJWT,adminCheck, addBookTransaction);

// Route to update an existing book transaction
router.route('/:id').put(verifyJWT,adminCheck, editBookTransaction);

// Route to delete a book transaction
router.route('/:id').delete(verifyJWT,adminCheck, removeBookTransaction);

export default router;
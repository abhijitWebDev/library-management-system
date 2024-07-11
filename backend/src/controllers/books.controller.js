import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Book } from "../models/Book.models.js"; // Import the Book model
import { ApiResponse } from "../utils/apiResponse.js";

const addBook = asyncHandler(async (req, res) => {
  try {
    // Add logic to add a new book
    const { name, author, currentAvailablityStatus } = req.body;

    const newBook = new Book({
      name,
      author,
      currentAvailablityStatus,
    });

    const savedBook = await newBook.save();

    res.status(201).json(new ApiResponse(201, savedBook, "Book added successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to add a new book");
  }
});

const editBook = asyncHandler(async (req, res) => {
  try {
    // Add logic to edit an existing book
    const { id } = req.params;
    const { name, author, currentAvailablityStatus } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, author, currentAvailablityStatus },
      { new: true }
    );

    if (!updatedBook) {
      throw new ApiError(404, "Book not found");
    }

    res.status(200).json(new ApiResponse(200, updatedBook, "Book updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to update the book");
  }
});

const removeBook = asyncHandler(async (req, res) => {
  try {
    // Add logic to remove a book
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      throw new ApiError(404, "Book not found");
    }

    res.status(200).json(new ApiResponse(200, {}, "Book removed successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to remove the book");
  }
});

const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  res.status(200).json(new ApiResponse(200, book, "Book retrieved successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find();
  res.status(200).json(new ApiResponse(200, allBooks, "All books retrieved successfully"));
});


export {
  addBook,
  editBook,
  removeBook,
  getBookById,
  getAllBooks
};

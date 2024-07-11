import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { BookTransaction } from "../models/BookTransaction.models.js"; // Import the BookTransaction model
import { ApiResponse } from "../utils/apiResponse.js";

// Add a new book transaction
const addBookTransaction = asyncHandler(async (req, res) => {
  try {
    const { userdetails, bookdetails, dueDate, transactionType } = req.body;

    // Validate required fields
    if (!userdetails || !bookdetails || !dueDate || !transactionType) {
      throw new ApiError(400, "All fields are required");
    }

    const newTransaction = new BookTransaction({
      userdetails,
      bookdetails,
      dueDate,
      transactionType,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json(new ApiResponse(201, savedTransaction, "Book transaction added successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to add a new book transaction");
  }
});

// Edit an existing book transaction
const editBookTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userdetails, bookdetails, dueDate, transactionType } = req.body;

    const updatedTransaction = await BookTransaction.findByIdAndUpdate(
      id,
      { userdetails, bookdetails, dueDate, transactionType },
      { new: true }
    );

    if (!updatedTransaction) {
      throw new ApiError(404, "Book transaction not found");
    }

    res.status(200).json(new ApiResponse(200, updatedTransaction, "Book transaction updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to update the book transaction");
  }
});

// Remove a book transaction
const removeBookTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await BookTransaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      throw new ApiError(404, "Book transaction not found");
    }

    res.status(200).json(new ApiResponse(200, {}, "Book transaction removed successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to remove the book transaction");
  }
});

export {
  addBookTransaction,
  editBookTransaction,
  removeBookTransaction,
};

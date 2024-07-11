import mongoose, { Schema } from 'mongoose';

const bookTransactionSchema = new mongoose.Schema(
  {
    userdetails: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookdetails: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    dueDate: { type: Date, required: true },
    transactionType: {
      type: String,
      enum: ['borrowed', 'returned'],
      required: true,
    },
  },
  { timestamps: true }
);

export const BookTransaction = mongoose.model(
  'BookTransaction',
  bookTransactionSchema
);

import mongoose from 'mongoose';

// Defines the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Exports the category model using the above schema previously defined
export const CategoryModel = mongoose.model( 'Category', categorySchema );

import mongoose from 'mongoose';

// Defines the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
    unique: [ true, 'Name already exists'],
  },
  description: {
    type: String,
    required: [ true, 'Description is required' ],
  },
  available: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

productSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ){
    delete ret._id;
  },
});

// Exports the product model using the above schema previously defined
export const ProductModel = mongoose.model( 'Product', productSchema );

import e from 'express';
import mongoose from 'mongoose';

// Defines the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: [ true, 'Email already exists'],
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
  },
  img: {
    type: String,
  },
  role: {
    type: [ String ],
    default: [ 'USER_ROLE' ],
    enum: [ 'ADMIN_ROLE', 'USER_ROLE' ],
  }
});

// Exports the user model using the above schema previously defined
export const UserModel = mongoose.model( 'User', userSchema );

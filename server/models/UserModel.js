import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  refresh_token: {
    type: String,
    default: null
  },
  marital_status: {
    type: String
  },
  children: {
    type: Number
  },
  credits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Credit'
    }
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ],
  divisions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division'
    }
  ],
  role: {
    type: String,
    default: 'user'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

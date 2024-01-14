import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a Name"],
  },
  phone: {
    type: String,
    required: [true, "Must provide phone number"],
    unique: [true, "This phone number is already in use"],
    match: [/^\+(?:[0-9] ?){6,14}[0-9]$/, "Please add a valid phone number"],
  },
  votes: {
    type: Number,
    default: 0,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    enum: ["hebrew", "arabic", "english"],
    default: "english",
  },
  location: {
    type: [Number], // Assuming location is an array of numbers (like [latitude, longitude])
    default: [],
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;

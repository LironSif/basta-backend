import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0.1,
  },
  image: {
    type: String, // URL to the image or base64 encoded string
    required: false,
  },
  owner: {
    type: String,
    ref: "User",
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

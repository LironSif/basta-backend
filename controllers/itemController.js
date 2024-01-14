import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const createItem = async (req, res, next) => {
  try {
    const { name, description, price, image, owner } = req.body;
    const newItem = await Item.create({
      name,
      description,
      price,
      image,
      owner,
    });
    res.status(STATUS_CODE.CREATED);
    res.send(newItem);
  } catch (error) {
    next(error);
  }
};

// Controller to get all items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find({}).populate("owner"); // Populate the 'owner' field
    res.status(STATUS_CODE.OK);
    res.send(items);
  } catch (error) {
    next(error);
  }
};

// Controller to delete a item by id
export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the item to get the owner's information
    const item = await Item.findById(id);
    if (!item) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such item in the db");
    }

    // If the item has an owner, remove the item from the owner's list
    if (item.owner) {
      await User.findByIdAndUpdate(item.owner, { $pull: { items: item._id } });
    }

    // Delete the item from the store
    await Item.deleteOne({ _id: item._id });

    res.send(`item with id ${id} was deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {  name, description, price, image } = req.body;

    if (!isValidObjectId(id)) {
      throw new Error("ID not valid");
    }

    const item = await Item.findById(id);

    // Make sure if book exist
    if (!item) {
      res.status(404);
      throw new Error("item does not exist");
    }

    item.name = name;
    item.description = description;
    item.price = price;
    item.image = image;

    const updatedItem = await item.save();
    console.log("updatedItem", updatedItem);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
};

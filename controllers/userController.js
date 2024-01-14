import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
// Controller to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate("items");
    res.send(users);
  } catch (error) {
    next(error);
  }
};

// Controller to create a new user
export const createUser = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const newUser = await User.create({ name, phone });
    res.status(STATUS_CODE.CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};

// Update user user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, phone, votes, isOpen, language } = req.body;

    if (!isValidObjectId(id)) {
      throw new Error("ID not valid");
    }

    const user = await User.findById(id);

    // Make sure if user exist
    if (!user) {
      res.status(404);
      throw new Error("item does not exist");
    }

    user.name = name;
    user.phone = phone;
    user.votes = votes;
    user.isOpen = isOpen;
    user.language = language;

    const updatedUser = await user.save();
    console.log("updatedUser", updatedUser);

    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { latitude, longitude } = req.body;

    if (!isValidObjectId(id)) {
      throw new Error("ID not valid");
    }

    const user = await User.findById(id);

    // Make sure if user exist
    if (!user) {
      res.status(404);
      throw new Error("item does not exist");
    }

    user.location = [latitude,longitude];

    const updatedUser = await user.save();

    res.send("Updated Location Successfuly")


  } catch (error) {
    next(error);
  }
};

export const navigation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    res.json({ googleMapsUrl });
  } catch (error) {
    next(error);
  }
};

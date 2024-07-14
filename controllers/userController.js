import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Desk from "../models/DeskModel.js";

export const getCurrentUser = async (req, res) => {
  const userWithoutPassword = await User.findOne({ _id: req.user.userId });
  const user = userWithoutPassword.toJSON();
  res.status(StatusCodes.OK).json({ user });
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve user" });
  }
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const desks = await Desk.countDocuments();
  res.status(StatusCodes.OK).json({ users, desks });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json("updated user");
};

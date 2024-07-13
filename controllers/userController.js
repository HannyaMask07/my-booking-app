import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Desk from "../models/DeskModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ userWithoutPassword });
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

import Desk from "../models/DeskModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllDesks = async (req, res) => {
  console.log(req);
  const desks = await Desk.find({});
  res.status(StatusCodes.OK).json({ desks });
};

export const createDesk = async (req, res) => {
  const desk = await Desk.create(req.body);
  res.status(StatusCodes.CREATED).json({ desk });
};

export const getDesk = async (req, res) => {
  const desk = await Desk.findById(req.params.id);
  res.status(StatusCodes.OK).json({ desk });
};

export const updateDesk = async (req, res) => {
  const updatedDesk = await Desk.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "desk modified", desk: updatedDesk });
};

export const deleteDesk = async (req, res) => {
  const removedDesk = await Desk.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "desk deleted" });
};

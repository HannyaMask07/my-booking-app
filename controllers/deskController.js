import Desk from "../models/DeskModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllDesks = async (req, res) => {
  const desks = await Desk.find({});
  res.status(StatusCodes.OK).json({ desks });
};

export const createDesk = async (req, res) => {
  const desk = await Desk.create(req.body);
  res.status(StatusCodes.CREATED).json({ desk });
};

export const getDesk = async (req, res) => {
  const { id } = req.params;
  const desk = await Desk.findById(id);
  console.log(desk);
  if (!desk) throw new NotFoundError(`no desk with id ${id}`);
  res.status(StatusCodes.OK).json({ desk });
};

export const updateDesk = async (req, res) => {
  const { id } = req.params;

  const updatedDesk = await Desk.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedDesk) throw new NotFoundError(`no desk with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "desk modified", desk: updatedDesk });
};

export const deleteDesk = async (req, res) => {
  const { id } = req.params;
  const removedDesk = await Desk.findByIdAndDelete(id);
  if (!removedDesk) throw new NotFoundError(`no desk with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "desk deleted" });
};

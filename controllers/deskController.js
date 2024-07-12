import { nanoid } from "nanoid";
import Desk from "../models/DeskModel.js";

let desks = [
  {
    id: nanoid(),
    location: "Floor 1, Section A",
    status: "available", // options: available, booked, out_of_service
    type: "standard", // options: standard, standing, meeting
    amenities: ["monitor", "keyboard", "mouse"], // list of available amenities
    currentBooking: {
      userId: "user789",
      startTime: "2024-07-12T08:00:00Z",
      endTime: "2024-07-12T16:00:00Z",
    },
  },
  {
    id: nanoid(),
    location: "Floor 2, Section B",
    status: "booked", // options: available, booked, out_of_service
    type: "standing", // options: standard, standing, meeting
    amenities: ["standing desk", "monitor arm"], // list of available amenities
    currentBooking: {
      userId: "user101",
      startTime: "2024-07-12T09:00:00Z",
      endTime: "2024-07-12T17:00:00Z",
    },
  },
];

export const getAllDesks = async (req, res) => {
  res.status(200).json({ desks });
};

export const createDesk = async (req, res) => {
  const { location } = req.body;
  const desk = await Desk.create({ location });
  res.status(201).json({ desk });
};

export const getDesk = async (req, res) => {
  const { id } = req.params;
  const desk = desks.find((desk) => desk.id === id);
  if (!desk) {
    return res.status(404).json({ msg: `no desk with id ${id}` });
  }
  res.status(200).json({ desk });
};

export const updateDesk = async (req, res) => {
  const { id } = req.params;
  const { location, status, type, amenities } = req.body;
  if (!location || !status || !type || !amenities) {
    return res.status(400).json({ msg: "please provide needed values" });
  }
  const desk = desks.find((desk) => desk.id === id);
  if (!desk) {
    return res.status(404).json({ msg: `no desk with id ${id}` });
  }
  desk.location = location;
  desk.status = status;
  desk.type = type;
  desk.amenities = amenities;
  res.status(200).json({ nsg: "desk modified", desk });
};

export const deleteDesk = async (req, res) => {
  const { id } = req.params;
  const desk = desks.find((desk) => desk.id === id);
  if (!desk) {
    return res.status(404).json({ msg: `no desk with id ${id}` });
  }
  const newDesks = desks.filter((desk) => desk.id !== id);
  desks = newDesks;
  res.status(200).json({ msg: "desk deleted" });
};

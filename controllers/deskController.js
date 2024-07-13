import Desk from "../models/DeskModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllDesks = async (req, res) => {
  const { search, status, amenities, type, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [{ deskNumber: { $regex: search, $options: "i" } }];
  }
  if (amenities && amenities !== "all") {
    queryObject.amenities = amenities;
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (type && type !== "all") {
    queryObject.type = type;
  }

  const sortOptions = {
    Highest: { deskNumber: -1 }, // Sort in descending order
    Lowest: { deskNumber: 1 }, // Sort in ascending order
  };

  // Extract the sort key from the query or default to 'Lowest'
  const sortKey = sortOptions[sort] || sortOptions.Lowest;

  // Fetch the desks
  let desks = await Desk.find(queryObject);

  // Sort desks based on the numeric part of the desk number
  desks = desks.sort((a, b) => {
    const numA = parseInt(a.deskNumber.replace(/\D/g, ""), 10);
    const numB = parseInt(b.deskNumber.replace(/\D/g, ""), 10);
    return sortKey.deskNumber === 1 ? numA - numB : numB - numA;
  });

  const totalDesks = await Job.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ totalDesks, desks });
};

export const getUserBookedDesk = async (req, res) => {
  try {
    const desks = await Desk.find({ bookedBy: req.user.userId });

    if (desks.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No desks found for the user" });
    }

    res.status(StatusCodes.OK).json({ desks });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const BookDesk = async (req, res) => {
  try {
    const existingBooking = await Desk.findOne({
      bookedBy: req.user.userId,
    });

    if (existingBooking) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User has already booked another desk" });
    }
    const desk = await Desk.findById(req.params.id);

    if (!desk) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Desk not found" });
    }

    if (desk.status !== "available") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Desk is not available for booking" });
    }

    const updatedDesk = await Desk.findByIdAndUpdate(
      req.params.id,
      {
        status: "booked",
        bookedBy: req.user.userId,
        currentBooking: {
          userId: req.user.userId,
          startTime: new Date(), // Set current time as start time
          endTime: req.body.endTime || null, // Optionally set end time if provided
        },
      },
      { new: true }
    );

    if (!updatedDesk) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to book the desk" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Desk booked successfully",
      desk: updatedDesk,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
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

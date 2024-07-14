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
    Highest: { deskNumber: -1 },
    Lowest: { deskNumber: 1 },
  };

  const sortKey = sortOptions[sort] || sortOptions.Lowest;

  //setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const desks = await Desk.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalDesks = await Desk.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDesks / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalDesks, numOfPages, currentPage: page, desks });
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
    req.body.bookedBy = req.user.userId;
    req.body.status = "booked";

    const updatedDesk = await Desk.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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

export const CancelBooking = async (req, res) => {
  try {
    // Fetch the current desk document
    const desk = await Desk.findById(req.params.id);

    if (!desk) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Desk not found" });
    }

    // Remove the bookedBy, startTime, and endTime fields
    desk.bookedBy = undefined; // Or use null if your schema allows it
    desk.startTime = undefined;
    desk.endTime = undefined;
    desk.status = "available"; // Set status to available

    // Save the updated desk
    const updatedDesk = await desk.save();

    res.status(StatusCodes.OK).json({
      msg: "Desk booking canceled successfully",
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

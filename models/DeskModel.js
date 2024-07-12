import mongoose from "mongoose";
import { DESK_STATUS, DESK_TYPE, DESK_AMENITIES } from "../utils/constants.js";

const DeskSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(DESK_STATUS),
      default: DESK_STATUS.AVAILABLE,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(DESK_TYPE),
      default: DESK_TYPE.STANDARD,
    },
    amenities: {
      type: [String],
      enum: Object.values(DESK_AMENITIES),
      default: Object.values(
        DESK_AMENITIES.KEYBOARD,
        DESK_AMENITIES.MOUSE,
        DESK_AMENITIES.SINGLE_MONITOR
      ),
    },
    currentBooking: {
      userId: {
        type: String,
        required: false,
      },
      startTime: {
        type: Date,
        required: false,
      },
      endTime: {
        type: Date,
        required: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Desk", DeskSchema);
import mongoose from "mongoose";

const DeskSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: () => nanoid(),
    // },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "booked", "out_of_service"],
      default: "available",
    },
    type: {
      type: String,
      required: true,
      enum: ["standard", "standing", "meeting"],
      default: "standard",
    },
    amenities: {
      type: [String],
      enum: [
        "Mouse",
        "Single Monitor",
        "Keyboard",
        "Two Monitors",
        "Laptop Stand",
      ],
      default: ["Mouse", "Single Monitor", "Keyboard"],
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

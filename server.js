import * as dotenv from "dotenv";
dotenv.config();
import express, { application } from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

//GET ALL DESKS
app.get("/api/v1/desks", (req, res) => {
  res.status(200).json({ desks });
});

//CREATE DESK
app.post("/api/v1/desks", (req, res) => {
  const { location, status, type, amenities } = req.body;
  if (!location || !status || !type || !amenities) {
    return res.status(400).json({ msg: "please provide needed values" });
  }
  const id = nanoid(10);
  const desk = { id, location, status, type, amenities };
  desks.push(desk);
  res.status(201).json({ desk });
});

//GET SINGLE DESK
app.get("/api/v1/desks/:id", (req, res) => {
  const { id } = req.params;
  const desk = desks.find((desk) => desk.id === id);
  if (!desk) {
    return res.status(404).json({ msg: `no desk with id ${id}` });
  }
  res.status(200).json({ desk });
});

//EDIT DESK



const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});

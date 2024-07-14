import { useEffect, useState } from "react";
import { FaSearchLocation, FaCalendarAlt } from "react-icons/fa";
import { PiDesktopBold } from "react-icons/pi";
import { GrStatusInfo } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Desk";
import DeskInfo from "./DeskInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

day.extend(advancedFormat);

const Desk = ({
  _id,
  deskNumber,
  location,
  status,
  type,
  amenities,
  startTime,
  endTime,
  bookedBy,
}) => {
  const startDate = startTime
    ? day(startTime).format("MMM Do, YYYY")
    : "Not booked";
  const endDate = endTime ? day(endTime).format("MMM Do, YYYY") : "Not booked";
  const [userName, setUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [hasBookings, setHasBookings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (bookedBy) {
        try {
          const response = await customFetch(`/users/getUserById/${bookedBy}`);
          const { data } = response;
          setUserName(data.user.name);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [bookedBy]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await customFetch("/users/current-user");
        const { data } = response;
        setCurrentUserId(data.user._id);
      } catch (error) {
        if (error?.response?.data?.message === "No user found") {
          // Handle user not found error
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  const handleCancelBooking = async () => {
    try {
      await customFetch.patch(`/desks/${_id}/cancelBooking`);
      toast.success("Booking cancelled successfully!");
      navigate("/dashboard/all-desks");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to cancel booking");
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          <PiDesktopBold />
        </div>
        <h5>
          {location} #{deskNumber}
        </h5>
      </header>
      <div className="content">
        <div className="content-center">
          <DeskInfo icon={<FaCalendarAlt />} text={startDate} />
          {bookedBy && <DeskInfo icon={<FaCalendarAlt />} text={endDate} />}
          {bookedBy && (
            <DeskInfo icon={<GrStatusInfo />} text={`Booked by: ${userName}`} />
          )}
          <div className={`status ${status}`}>{status}</div>
          <div className={`status ${type}`}>{type}</div>
        </div>
        <div className="content-center">
          Amenities:
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        {bookedBy != currentUserId && (
          <footer className="actions">
            <Link to={`../book-desk/${_id}`} className="btn edit-btn">
              Book
            </Link>
          </footer>
        )}
        {bookedBy === currentUserId && (
          <footer className="actions">
            <button onClick={handleCancelBooking} className="btn edit-btn">
              Cancel booking
            </button>
          </footer>
        )}
      </div>
    </Wrapper>
  );
};

export default Desk;

import { useEffect, useState } from "react";
import { FaSearchLocation, FaCalendarAlt } from "react-icons/fa";
import { PiDesktopBold } from "react-icons/pi";
import { GrStatusInfo } from "react-icons/gr";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Desk";
import DeskInfo from "./DeskInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/customFetch";
day.extend(advancedFormat);

const Desk = ({
  _id,
  deskNumber,
  location,
  status,
  type,
  amenities,
  currentBooking,
  bookedBy,
}) => {
  const [userName, setUserName] = useState("");
  const { startTime } = currentBooking || {};
  const date = startTime ? day(startTime).format("MMM Do, YYYY") : "Not booked";

  useEffect(() => {
    const fetchUser = async () => {
      if (bookedBy) {
        try {
          const { data } = await customFetch(`/users/getUserById/${bookedBy}`);
          setUserName(data.name); // Assuming the user object has a 'name' field
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [bookedBy]);

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
          <DeskInfo icon={<MdDescription />} text={type} />
          <DeskInfo icon={<FaCalendarAlt />} text={date} />
          {bookedBy && (
            <DeskInfo icon={<GrStatusInfo />} text={`Booked by: ${userName}`} />
          )}
          <div className={`status ${status}`}>{status}</div>
          <div className={`status ${type}`}>{type}</div>
        </div>
        <footer className="actions">
          <Link to={`../book-desk/${_id}`} className="btn edit-btn">
            Book
          </Link>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Desk;

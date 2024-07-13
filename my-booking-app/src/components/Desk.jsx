import { FaSearchLocation, FaCalendarAlt } from "react-icons/fa";
import { PiDesktopBold } from "react-icons/pi";
import { GrStatusInfo } from "react-icons/gr";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Desk";
import DeskInfo from "./DeskInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const Desk = ({
  _id,
  deskNumber,
  location,
  status,
  type,
  amenities,
  currentBooking,
  bookedBy,
}) => {
  const { startTime } = currentBooking || {};
  const date = startTime ? day(startTime).format("MMM Do, YYYY") : "Not booked";

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
          <div className={`status ${status}`}>{status}</div>
          <div className={`status ${type}`}>{type}</div>
        </div>
        <footer className="actions">
          <Link type="submit" className="btn edit-btn">
            Book
          </Link>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Desk;

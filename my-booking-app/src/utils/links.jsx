import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaDesktop } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";

const links = [
  {
    text: "add desk",
    path: ".",
    icon: <FaDesktop />,
  },
  {
    text: "My booking",
    path: "user-bookings",
    icon: <FaAddressBook />,
  },
  {
    text: "all desks",
    path: "all-desks",
    icon: <HiOfficeBuilding />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;

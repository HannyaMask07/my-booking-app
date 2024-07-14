import customFetch from "../utils/customFetch";
import { UserDeskContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/desks/booked");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllDesksContext = createContext();
const UserBookings = () => {
  const { data } = useLoaderData();
  return (
    <AllDesksContext.Provider value={{ data }}>
      <h3>Your Bookings</h3>
      <UserDeskContainer />
    </AllDesksContext.Provider>
  );
};

export const useAllDesksContext = () => useContext(AllDesksContext);

export default UserBookings;

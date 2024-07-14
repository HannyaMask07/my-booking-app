import customFetch from "../utils/customFetch";
import { UserDeskContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/desks/booked");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { data: [] }; // Return an empty array instead of error
  }
};

const AllDesksContext = createContext();
const UserBookings = () => {
  const { data } = useLoaderData();

  return (
    <AllDesksContext.Provider value={{ data }}>
      {data.length === 0 ? (
        <h4>No Active Bookings</h4>
      ) : (
        <>
          <h3>Your Bookings</h3>
          <UserDeskContainer />
        </>
      )}
    </AllDesksContext.Provider>
  );
};

export const useAllDesksContext = () => useContext(AllDesksContext);

export default UserBookings;

import customFetch from "../utils/customFetch";
import { DesksContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/desks");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllDesksContext = createContext();
const AllDesks = () => {
  const { data } = useLoaderData();
  return (
    <AllDesksContext.Provider value={{ data }}>
      <SearchContainer />
      <DesksContainer />
    </AllDesksContext.Provider>
  );
};

export const useAllDesksContext = () => useContext(AllDesksContext);

export default AllDesks;

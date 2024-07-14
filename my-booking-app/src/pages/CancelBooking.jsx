import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import WrapperDetail from "../assets/wrappers/Desk";
import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import DeskInfo from "../components/DeskInfo";
import { PiDesktopBold } from "react-icons/pi";
import { MdDescription } from "react-icons/md";
dayjs.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data: deskData } = await customFetch.get(`/desks/${params.id}`);
    const { data: userData } = await customFetch.get("/users/current-user");
    return { desk: deskData, user: userData };
  } catch (error) {
    // Log the error for debugging
    toast.error(error?.response?.data?.msg || "Failed to load desk data");
    return redirect("/dashboard/all-desks");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/desks/${params.id}/book`, data);
    toast.success("Desk booked successfully");
    return redirect("/dashboard/user-bookings");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to book desk");
    return redirect("/dashboard/all-desks");
  }
};

function BookDesk() {
  const { desk, user } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "booking";
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  return (
    <Wrapper>
      <WrapperDetail>
        <h4 className="form-title">Cancel booking</h4>
        <header>
          <div className="main-icon">
            <PiDesktopBold />
          </div>
          <h5>
            {desk.desk.location} #{desk.desk.deskNumber}
          </h5>
        </header>
        <div className="content">
          <div className="content-center">
            <div className={`status ${desk.desk.status}`}>
              {desk.desk.status}
            </div>
            <div className={`status ${desk.desk.type}`}>{desk.desk.type}</div>
            <div className="content-center">
              Amenities:
              <ul>
                {desk.desk.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </WrapperDetail>
      <Form method="post" className="form">
        <div className="form-center">
          <FormRow type="date" name="startTime" defaultValue={today} />
          <FormRow type="date" name="endTime" defaultValue={tomorrow} />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "booking" : "book"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default BookDesk;

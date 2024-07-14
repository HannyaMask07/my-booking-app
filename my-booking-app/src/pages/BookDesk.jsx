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
    const { data } = await customFetch.get(`/desks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
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
    toast.error(error?.response?.data?.msg);
  }
};

function BookDesk() {
  const { desk } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "booking";
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  return (
    <Wrapper>
      <WrapperDetail>
        <header>
          <div className="main-icon">
            <PiDesktopBold />
          </div>
          <h5>
            {desk.location} #{desk.deskNumber}
          </h5>
        </header>
        <div className="content">
          <div className="content-center">
            <DeskInfo icon={<MdDescription />} text={desk.type} />
            <div className={`status ${desk.status}`}>{desk.status}</div>
            <div className={`status ${desk.type}`}>{desk.type}</div>
          </div>
        </div>
      </WrapperDetail>
      <Form method="post" className="form">
        <h4 className="form-title">Book desk</h4>
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

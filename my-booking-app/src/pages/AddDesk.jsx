import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import {
  DESK_TYPE,
  DESK_AMENITIES,
  DESK_LOCATION,
} from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const amenities = formData.getAll("amenities");
  const data = Object.fromEntries(formData);
  data.amenities = amenities;

  try {
    await customFetch.post("/desks", data);
    toast.success("Desk added successfully");
    return redirect("all-desks");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddDesk = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add desk</h4>
        <div className="form-center">
          <FormRow type="text" name="deskNumber" />
          <FormRowSelect
            labelText="Desk Type"
            name="type"
            defaultValue={DESK_TYPE.STANDARD}
            list={Object.values(DESK_TYPE)}
          />
          <FormRowSelect
            labelText="Desk Location"
            name="location"
            defaultValue={DESK_LOCATION.SECTOR_A}
            list={Object.values(DESK_LOCATION)}
          />
          <FormRowSelect
            labelText="Desk Amenities"
            name="amenities"
            defaultValue={[]}
            list={Object.values(DESK_AMENITIES)}
            isMultiSelect={true}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddDesk;

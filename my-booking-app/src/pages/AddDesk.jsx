import { FormRow } from "../components";
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

const AddDesk = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigatio.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add desk</h4>
        <div className="form-center">
          <FormRow type="text" name="deskNumber" />
          <button type='submit' class
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddDesk;

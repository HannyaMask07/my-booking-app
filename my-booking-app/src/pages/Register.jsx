import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Kris" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Trytek"
        />
        <FormRow type="text" name="location" defaultValue="Krakow" />
        <FormRow type="email" name="email" defaultValue="kris@gmail.com" />
        <FormRow type="password" name="password" defaultValue="zxc413" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

import Wrapper from "../assets/wrappers/DeskInfo";

export const DeskInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="desk-icon">{icon}</span>
      <span className="desk-text">{text}</span>
    </Wrapper>
  );
};

export default DeskInfo;

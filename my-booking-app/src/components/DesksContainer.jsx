import Desk from "./Desk";
import Wrapper from "../assets/wrappers/DeskContainer";
import { useAllDesksContext } from "../pages/AllDesks";

const DesksContainer = () => {
  const { data } = useAllDesksContext();
  const { desks } = data;
  if (desks.length === 0) {
    return (
      <Wrapper>
        <h2>No desks to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="desks">
        {desks.map((desk) => {
          return <Desk key={desk._id} {...desk} />;
        })}
      </div>
    </Wrapper>
  );
};

export default DesksContainer;

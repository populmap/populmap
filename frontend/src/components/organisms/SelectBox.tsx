import { SetStateAction, Dispatch } from "react";
import progressType from "../../types/dto/EventDetailResponse.dto";
import CityType from "../../../../backend/src/enums/city.type.enum";
import SelectInstance from "../atoms/selects/SelectInstance";

interface SelectBoxProps {
  setCity: Dispatch<SetStateAction<string>>;
  setProgress: Dispatch<SetStateAction<string>>;
}

const progressStyle = {
  fontSize: "0.6rem",
  width: "4rem",
  height: "1.5rem",
  border: "0.05rem solid gray",
  borderRadius: "0.7rem",
  color: "black",
  backgroundColor: "white",
  textAlign: "center",
  marginLeft: "0.3rem",
};

const SelectBox = (props: SelectBoxProps): JSX.Element => {
  const { setCity, setProgress } = props;

  return (
    <>
      <SelectInstance
        options={Object.values(CityType)}
        type="city"
        setValue={setCity}
      />
      <SelectInstance
        options={Object.values(progressType)}
        type="progress"
        setValue={setProgress}
        style={progressStyle}
      />
    </>
  );
};

export default SelectBox;

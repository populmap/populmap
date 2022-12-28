import { SetStateAction, Dispatch } from "react";
import progressStatus from "../../types/dto/EventDetailResponse.dto";
import CityType from "../../../../backend/src/enums/city.type.enum";
import SelectInstance from "../atoms/selects/SelectInstance";

interface SelectBoxProps {
  setCity: Dispatch<SetStateAction<string>>;
  setProgress: Dispatch<SetStateAction<string>>;
}

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
        options={Object.values(progressStatus)}
        type="progress"
        setValue={setProgress}
        style={{
          fontSize: "0.6rem",
          width: "4rem",
          height: "1.5rem",
          border: "0.05rem solid gray",
          borderRadius: "0.7rem",
          textAlign: "center",
          marginLeft: "0.3rem",
        }}
      />
    </>
  );
};

export default SelectBox;

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
      />
    </>
  );
};

export default SelectBox;

import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import EventIcon from "@mui/icons-material/Event";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface MapFilterProps {
  isEventShow: boolean;
  isBookmarkShow: boolean;
  isPeopleShow: boolean;
  isAccidentShow: boolean;
  setIsEventShow: Dispatch<SetStateAction<boolean>>;
  setIsBookmarkShow: Dispatch<SetStateAction<boolean>>;
  setIsPeopleShow: Dispatch<SetStateAction<boolean>>;
  setIsAccidentShow: Dispatch<SetStateAction<boolean>>;
}

const MapDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

type buttonProps = {
  isShow: boolean;
};

const FilterButton = styled.button<buttonProps>`
  border-radius: 0.5rem;
  width: 3.5rem;
  height: 1.5rem;
  border: 0;
  margin: 0 0.3rem;
  background-color: ${(props): string => (props.isShow ? "#0080FE" : "white")};
  color: ${(props): string => (props.isShow ? "white" : "inherit")};
  font-size: 0.5rem;
  svg {
    margin-top: 0.2rem;
    width: 0.8rem;
    height: 0.8rem;
    color: ${(props): string => (props.isShow ? "white" : "inherit")};
  }
`;

const MapFilter = (props: MapFilterProps): JSX.Element => {
  const {
    isEventShow,
    isBookmarkShow,
    isPeopleShow,
    isAccidentShow,
    setIsEventShow,
    setIsBookmarkShow,
    setIsPeopleShow,
    setIsAccidentShow,
  } = props;

  return (
    <MapDiv>
      <FilterButton
        isShow={isEventShow}
        onClick={(): void => setIsEventShow((state) => !state)}
      >
        <EventIcon /> 행사
      </FilterButton>
      <FilterButton
        isShow={isBookmarkShow}
        onClick={(): void => setIsBookmarkShow((state) => !state)}
      >
        <BookmarkIcon /> 북마크
      </FilterButton>
      <FilterButton
        isShow={isPeopleShow}
        onClick={(): void => setIsPeopleShow((state) => !state)}
      >
        <PersonIcon /> 밀집도
      </FilterButton>
      <FilterButton
        isShow={isAccidentShow}
        onClick={(): void => setIsAccidentShow((state) => !state)}
      >
        <WarningAmberIcon /> 사고
      </FilterButton>
    </MapDiv>
  );
};

export default MapFilter;

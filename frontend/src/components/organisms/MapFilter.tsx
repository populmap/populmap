import styled from "@emotion/styled";
import EventIcon from "@mui/icons-material/Event";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  mapSetIsEventShow,
  mapSetIsBookmarkShow,
  mapSetIsPeopleShow,
  mapSetIsAccidentShow,
} from "../../redux/slices/mapSlice";

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

const MapFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);

  return (
    <MapDiv>
      <FilterButton
        isShow={mapState.isEventShow}
        onClick={(): PayloadAction => dispatch(mapSetIsEventShow())}
      >
        <EventIcon /> 행사
      </FilterButton>
      <FilterButton
        isShow={mapState.isBookmarkShow}
        onClick={(): PayloadAction => dispatch(mapSetIsBookmarkShow())}
      >
        <BookmarkIcon /> 북마크
      </FilterButton>
      <FilterButton
        isShow={mapState.isPeopleShow}
        onClick={(): PayloadAction => dispatch(mapSetIsPeopleShow())}
      >
        <PersonIcon /> 밀집도
      </FilterButton>
      <FilterButton
        isShow={mapState.isAccidentShow}
        onClick={(): PayloadAction => dispatch(mapSetIsAccidentShow())}
      >
        <WarningAmberIcon /> 사고
      </FilterButton>
    </MapDiv>
  );
};

export default MapFilter;

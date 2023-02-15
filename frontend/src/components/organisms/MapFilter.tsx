import styled from "@emotion/styled";
import EventIcon from "@mui/icons-material/Event";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  filterSetIsEventShow,
  filterSetIsBookmarkShow,
  filterSetIsPeopleShow,
  filterSetIsAccidentShow,
} from "../../redux/slices/filterSlice";

const MapDiv = styled.div`
  touch-action: none;
`;

type buttonProps = {
  isShow: boolean;
};

const FilterButton = styled.button<buttonProps>`
  border-radius: 0.5rem;
  width: 4rem;
  height: 1.5rem;
  border: 0;
  margin: 0 0.4rem;
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
  const filterState = useAppSelector((state) => state.filter);

  return (
    <MapDiv>
      <FilterButton
        isShow={filterState.isEventShow}
        onClick={(): PayloadAction => dispatch(filterSetIsEventShow())}
      >
        <EventIcon /> 행사
      </FilterButton>
      <FilterButton
        isShow={filterState.isBookmarkShow}
        onClick={(): PayloadAction => dispatch(filterSetIsBookmarkShow())}
      >
        <BookmarkIcon /> 북마크
      </FilterButton>
      <FilterButton
        isShow={filterState.isPeopleShow}
        onClick={(): PayloadAction => dispatch(filterSetIsPeopleShow())}
      >
        <PersonIcon /> 밀집도
      </FilterButton>
      <FilterButton
        isShow={filterState.isAccidentShow}
        onClick={(): PayloadAction => dispatch(filterSetIsAccidentShow())}
      >
        <WarningAmberIcon /> 사고
      </FilterButton>
    </MapDiv>
  );
};

export default MapFilter;

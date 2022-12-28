import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import RoofingIcon from "@mui/icons-material/Roofing";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { userPageSelected } from "../../redux/slices/userSlice";

const NavSection = styled.section`
  position: fixed;
  top: ${window.ontouchstart ? "70%" : "85%"};
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, 0%);
  touch-action: none;
`;

const BottomNavigationStyle = {
  borderRadius: "0.7rem",
  width: "20rem",
  border: "0.05rem solid gray",
};

const NavTemplate = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ): void => {
    dispatch(userPageSelected(value));
    switch (value) {
      case 0:
        return navigate("/event");
      case 1:
        return navigate("/");
      case 2:
        return navigate("/bookmark");
    }
  };

  return (
    <NavSection>
      <BottomNavigation
        showLabels
        onChange={handleChange}
        style={BottomNavigationStyle}
      >
        <BottomNavigationAction
          label="Event"
          icon={user.pageSelected === 0 && <EventIcon />}
        />
        <BottomNavigationAction
          label="Home"
          icon={user.pageSelected === 1 && <RoofingIcon />}
        />
        <BottomNavigationAction
          label="Bookmark"
          icon={user.pageSelected === 2 && <BookmarkIcon />}
        />
      </BottomNavigation>
    </NavSection>
  );
};

export default NavTemplate;

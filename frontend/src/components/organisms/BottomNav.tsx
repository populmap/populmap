import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import RoofingIcon from "@mui/icons-material/Roofing";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { userPageSelected } from "../../redux/slices/userSlice";

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  touch-action: none;
`;

const BottomNavigationStyle = {
  borderRadius: "0.7rem",
  width: "300px",
  border: "0.05rem solid gray",
};

const BottomNav = (): JSX.Element => {
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
    <NavStyle>
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
    </NavStyle>
  );
};

export default BottomNav;

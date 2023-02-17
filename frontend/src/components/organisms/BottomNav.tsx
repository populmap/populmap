import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import RoofingIcon from "@mui/icons-material/Roofing";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  touch-action: none;
`;

const BottomNavigationStyle = styled(BottomNavigation)`
  width: 300px;
  border: 0.05rem solid gray;
  border-radius: 0.7rem;
`;

const BottomNav = (): JSX.Element => {
  const navigate = useNavigate();

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ): void => {
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
      <BottomNavigationStyle showLabels onChange={handleChange}>
        <BottomNavigationAction label="Event" icon={<EventIcon />} />
        <BottomNavigationAction label="Home" icon={<RoofingIcon />} />
        <BottomNavigationAction label="Bookmark" icon={<BookmarkIcon />} />
      </BottomNavigationStyle>
    </NavStyle>
  );
};

export default BottomNav;

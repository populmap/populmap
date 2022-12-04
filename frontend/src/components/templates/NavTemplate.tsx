import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import RoofingIcon from "@mui/icons-material/Roofing";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// TODO: handleClick 함수를 통해 navigate되도록 수정 필요.
const NavSection = styled.section`
  position: absolute;
  top: 80%;
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, 0%);
`;

const BottomNavigationStyle = {
  borderRadius: "0.7rem",
  width: "25rem",
};

const NavTemplate = (): JSX.Element => {
  const [value, setValue] = useState<number>();
  const navigate = useNavigate();

  return (
    <NavSection>
      <BottomNavigation showLabels value={value} style={BottomNavigationStyle}>
        <BottomNavigationAction
          onClick={(): void => navigate("/event")}
          label="Event"
          icon={<EventIcon />}
        />
        <BottomNavigationAction
          onClick={(): void => navigate("/")}
          label="Home"
          icon={<RoofingIcon />}
        />
        <BottomNavigationAction
          onClick={(): void => navigate("/bookmark")}
          label="Bookmark"
          icon={<BookmarkIcon />}
        />
      </BottomNavigation>
    </NavSection>
  );
};

export default NavTemplate;

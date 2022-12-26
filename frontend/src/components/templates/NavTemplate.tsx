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
          style={{
            borderLeft: "0.05rem solid gray",
            borderRight: "0.05rem solid gray",
          }}
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

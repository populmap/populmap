import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

// TODO: handleClick 함수를 통해 navigate되도록 수정 필요.
const NavSection = styled.section`
  position: absolute;
  top: 86%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const BottomNavigationStyle = {
  borderRadius: "0.7rem",
  width: "25rem",
};

const NavTemplate = (): JSX.Element => {
  const [value, setValue] = useState<number>();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("handleClick");
  };
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
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={(): void => navigate("/bookmark")}
          label="Bookmark"
          icon={<BookmarkBorderIcon />}
        />
        <BottomNavigationAction
          onClick={(): void => navigate("/login")}
          label="Login"
          icon={<LoginIcon />}
        />
      </BottomNavigation>
    </NavSection>
  );
};

export default NavTemplate;

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: handleClick 함수를 통해 navigate되도록 수정 필요.
const NavTemplate = (): JSX.Element => {
  const [value, setValue] = useState<number>();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("handleClick");
  };
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
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
    </BottomNavigation>
  );
};

export default NavTemplate;

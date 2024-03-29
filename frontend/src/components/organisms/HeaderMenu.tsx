import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { userInitialize } from "../../redux/slices/userSlice";
import { axiosAuthLogout } from "../../network/axios/axios.auth";

const HeaderMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePassword = (): void => {
    if (userState.userId === -1) alert("로그인이 필요합니다.");
    else navigate("/changepassword");
  };

  const handleLogout = (): void => {
    axiosAuthLogout()
      .then((response) => {
        if (response.status === 200) {
          dispatch(userInitialize());
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Button onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={(): void => navigate("/event")}>행사</MenuItem>
        <MenuItem onClick={(): void => navigate("/bookmark")}>북마크</MenuItem>
        <MenuItem onClick={(): void => navigate("/signup")}>회원가입</MenuItem>
        <MenuItem onClick={handleChangePassword}>비밀번호 변경</MenuItem>
        {userState.userId === -1 ? (
          <MenuItem onClick={(): void => navigate("/login")}>로그인</MenuItem>
        ) : (
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default HeaderMenu;

import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { axiosAuthLogout } from "../../../network/axios/axios.auth";
import { useAppDispatch } from "../../../redux/hook";
import { userInitialize } from "../../../redux/slices/userSlice";

const LogoutItem = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return <MenuItem onClick={handleLogout}>로그아웃</MenuItem>;
};

export default LogoutItem;

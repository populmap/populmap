import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { userInfoUpdate } from "../redux/slices/userSlice";
import { getCookie } from "../network/react-cookie/cookie";
import { useEffect } from "react";

const useGetToken = (): void => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const token = getCookie("populmap_token");

  useEffect(() => {
    if (user.userId === -1 && token) {
      dispatch(userInfoUpdate(jwtDecode(token)));
      navigate("/");
    }
  }, [token]);
};

export default useGetToken;

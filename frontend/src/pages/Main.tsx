import ContentTemplate from "../components/templates/ContentTemplate";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import SearchTemplate from "../components/templates/SearchTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";
import { useAppDispatch } from "../redux/hook";
import { userPageSelected } from "../redux/slices/userSlice";
import { useEffect } from "react";

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userPageSelected(1));
  }, []);

  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SearchTemplate />
      <MainTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Main;

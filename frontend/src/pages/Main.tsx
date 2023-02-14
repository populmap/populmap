import styled from "@emotion/styled";
import ContentTemplate from "../components/templates/ContentTemplate";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import SearchTemplate from "../components/templates/SearchTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";
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
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Main;

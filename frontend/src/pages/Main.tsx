import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import ContentTemplate from "../components/templates/ContentTemplate";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import SearchTemplate from "../components/templates/SearchTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Main = (): JSX.Element => {
  const { loading, error } = useInjectKakaoMapApi({
    appkey: `${import.meta.env.VITE_KAKAO_MAP_KEY}`,
    libraries: ["services"],
  });

  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SearchTemplate />
      {!loading && <MainTemplate />}
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Main;

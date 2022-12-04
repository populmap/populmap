import styled from "@emotion/styled";
import NaverIcon from "../../../img/naver.png";
import KakaoIcon from "../../../img/kakao.png";
import GoogleIcon from "../../../img/google.svg";

const Div = styled.div`
  display: flex;
  justify-content: center;
  a {
    margin: 1rem;
  }
`;

const OauthLoginNav = (): JSX.Element => {
  return (
    <Div>
      <a href="/auth/naver/login">
        <img src={NaverIcon} width={32} height={32} alt="naver" />
      </a>
      <a href="/auth/kakao/login">
        <img src={KakaoIcon} width={32} height={32} alt="kakao" />
      </a>
      <a href="/auth/google/login">
        <img src={GoogleIcon} alt="google" />
      </a>
    </Div>
  );
};

export default OauthLoginNav;

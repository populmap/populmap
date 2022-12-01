import styled from "@emotion/styled";
import { useState } from "react";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import FindUserInfoButton from "../atoms/buttons/FindUserInfoButton";

const NavSection = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginNav = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <NavSection>
      <PageNavigateButton value="회원가입" route="/signup" />
      <FindUserInfoButton type="id" value="계정 찾기" />
      <FindUserInfoButton type="password" value="비밀번호 찾기" />
    </NavSection>
  );
};

export default LoginNav;

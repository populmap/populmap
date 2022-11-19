import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const ContentSection = styled.article`
  height: 100vh;
  width: 100vw;
  max-width: 30rem;
  max-height: 60rem;
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentTemplate;

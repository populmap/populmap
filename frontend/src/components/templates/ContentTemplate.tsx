import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const ContentSection = styled.section`
  height: 100vh;
  width: 100vw;
  max-width: 30rem;
  max-height: 60rem;
  text-align: center;
`;

const ContentTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  return <ContentSection id="content">{children}</ContentSection>;
};

export default ContentTemplate;

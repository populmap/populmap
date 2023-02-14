import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const ContentSection = styled.section`
  height: 100vh;
  width: 100vw;
  max-width: 30rem;
  max-height: 60rem;
  margin: 0 auto;
`;

const ContentTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentTemplate;

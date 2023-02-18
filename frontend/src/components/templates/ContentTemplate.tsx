import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const ContentSection = styled.section`
  max-width: 480px;
  max-height: 960px;
  margin: 0 auto;
`;

const ContentTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentTemplate;

import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const ListTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  const ListSection = styled.section`
    position: absolute;
    text-align: center;
    top: 5%;
    width: 100%;
    height: 95%;
  `;

  return (
    <ListSection>
      {/* <SelectFrom /> */}
      {children}
      Event or Bookmark list
      {/* <Pagination /> */}
    </ListSection>
  );
};

export default ListTemplate;

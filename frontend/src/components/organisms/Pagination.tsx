import styled from "@emotion/styled";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface PaginationProps {
  totalLength: number | undefined;
  index: number;
  length: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const PaginationNavStyle = styled.nav`
  button {
    border: 0;
    background-color: white;
  }
`;

const Pagination = (props: PaginationProps): JSX.Element => {
  const { totalLength, index, length, setIndex } = props;
  const [maxPage, setMaxPage] = useState<number>(0);

  useEffect(() => {
    totalLength && setMaxPage(Math.ceil(totalLength / length));
  }, [totalLength]);

  return (
    <PaginationNavStyle>
      <button onClick={() => setIndex(0)} disabled={index === 0}>
        {"<<"}
      </button>
      <button onClick={() => setIndex(index - 1)} disabled={index === 0}>
        {"<"}
      </button>
      <button>{index + 1}</button>
      <button
        onClick={() => setIndex(index + 1)}
        disabled={index + 1 === maxPage}
      >
        {">"}
      </button>
      <button
        onClick={() => setIndex(maxPage - 1)}
        disabled={index + 1 === maxPage}
      >
        {">>"}
      </button>
    </PaginationNavStyle>
  );
};

export default Pagination;

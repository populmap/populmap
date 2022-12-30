import styled from "@emotion/styled";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface PaginationProps {
  totalLength: number | undefined;
  page: number;
  length: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PaginationNavStyle = styled.nav`
  button {
    border: 0;
    background-color: white;
  }
`;

const PaginationButtonStyle = styled.button``;

const Pagination = (props: PaginationProps): JSX.Element => {
  const { totalLength, page, length, setPage } = props;
  const [pageNum, setPageNum] = useState<number>(-1);
  const [pageList, setPageList] = useState<Array<number>>();
  const [isChange, setIsChange] = useState<string>("next");

  const handleNext = (): void => {
    if (totalLength && page < totalLength) setPage(page + 1);
    if ((page + 1) % 5 === 0) setIsChange("next");
  };

  const handlePrev = (): void => {
    if (0 < page) setPage(page - 1);
    if (page % 5 === 0) setIsChange("prev");
  };

  useEffect(() => {
    if (totalLength) setPageNum(Math.ceil(totalLength / length));
  }, []);

  useEffect(() => {
    const tmp = new Array();
    if (isChange === "next")
      for (let i = 0; i <= 4; i++) tmp[i] = page + (i + 1);
    else if (isChange === "prev")
      for (let i = 0; i <= 4; i++) tmp[i] = page - (3 - i);
    if (tmp.length !== 0) setPageList(tmp);
    setIsChange("");
  }, [isChange]);

  return (
    <PaginationNavStyle>
      <button onClick={handlePrev} disabled={page === 0}>
        {"<"}
      </button>
      {pageList?.map((value, index) => {
        return (
          <button
            onClick={(): void => setPage(value - 1)}
            style={{ color: page === value - 1 ? "red" : "black" }}
            key={index}
          >
            {value}
          </button>
        );
      })}
      <button onClick={handleNext} disabled={page === pageNum}>
        {">"}
      </button>
    </PaginationNavStyle>
  );
};

export default Pagination;
